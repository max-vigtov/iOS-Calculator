import { useRef, useState } from "react"

enum Operator {
    add,
    subtract,
    multiply,
    divide
}

export const useCalculator = () => {
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0')

    const lastOperation = useRef<Operator>()

    const clean = () => {
        setNumber('0');
        setPrevNumber('0')
    }

    const deleteOperation = () => {
        let currentSign = '';
        let temporalNumber = number;

        if ( number.includes('-') ) {
            currentSign = '-';
            temporalNumber = number.substring(1);
        }

        if ( temporalNumber.length > 1) {
            return setNumber( currentSign + temporalNumber.slice(0, -1) );            
        }

        setNumber('0');
    }    

    const toggleSign = () => {
        if ( number.includes('-') ) {
            return setNumber( number.replace('-','') )
        }
        setNumber( '-' + number );
    }

    const buildNumber = ( numberString: string ) => {

        if( number.includes('.') && numberString === '.') return;

        if ( number.startsWith('0') || number.startsWith('-0') ) {

            //Decimal point
          if ( numberString === '.' ) {
            return setNumber( number + numberString );
          }

          //Evaluate if the number other 0 and no point
          if ( numberString === '0' && number.includes('.') ) { 
            return setNumber( number + numberString );
          }

          //Evaluate if the number is != 0, no point and is the first number
          if ( numberString !== '0' && !number.includes('.') ) {
            return setNumber( numberString );    
          }

          // Avoid 0000.0000000
          if ( numberString === '0' && !number.includes('.') ) {
            return;    
          }
         
          return setNumber( number + numberString );
          
        }

        setNumber( number + numberString );
    }

    const setLastNumber = () => {
        if ( number.endsWith('.') ) {
            setPrevNumber( number.slice(0, -1) );
        } else{
            setPrevNumber( number );
        }
        setNumber( '0' )
    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }
    
    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }        

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }        

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }    

  return {
    number,
    prevNumber,
    buildNumber,
    toggleSign,
    clean,
    deleteOperation,
    divideOperation,
    subtractOperation,
    multiplyOperation,
    addOperation,    
  }
  
}
