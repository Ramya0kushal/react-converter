import { useState, useEffect } from 'react';
function Converter() {
    const [fxRate, setFxRate] = useState(1.1);
    const [inputValue, setInputValue] = useState(0);
    const [switchValue, setSwitchValue] = useState('EUR');
    const [override, setOverride] = useState('No');
    const [historicalData, setHistoricalData] = useState([]);
    const [userFxRate,setUserFxRate]=useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setFxRate(Number((1.1 + (Math.random() * (0.05 - (-0.05)) + (-0.05))).toFixed(2)));
        }, 3000);
        return () => clearInterval(intervalId);
    }, [fxRate]);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSwitchChange = (e) => {
        setSwitchValue(e.target.value);
    };
    const handleOverrideChange = (e) => {
        console.log(e.target.value);
        setOverride(e.target.value);
    };
    const convert = () => {
        if(inputValue == 0)return;
        if(override === 'Yes' && userFxRate == 0) return;
        let convertedValue;
        let flag= override === 'Yes' ? true : false;
        console.log("override ",override);
        console.log("2% ",(Math.abs(userFxRate -  fxRate) / fxRate));
        if(flag && (Math.abs(userFxRate -  fxRate) / fxRate > 0.02)){
          flag=!flag;
        }
        if (switchValue === 'EUR') {
            convertedValue = inputValue * (flag ? userFxRate:fxRate);
        } else {
            convertedValue = inputValue / (flag ? userFxRate:fxRate);
        }
        convertedValue=Number(convertedValue.toFixed(2));
        if (historicalData.length >4) {
            historicalData.pop();
          }
        let rate=flag ? userFxRate:fxRate;
        let overrideFlag=flag ? 'Yes' :'No';
        setHistoricalData([
            {
                rate,
                overrideFlag,
                inputValue,
                switchValue,
                convertedValue,
            },
            ...historicalData
        ]);
    };
    const validNumber=(event) => {
        if((event.which >= 48 && event.which <= 57) || event.which==46){
          //console.log(event.key  + " " + event.which);
         }
         else{
          event.preventDefault();
         }
      }
    return (
        <div className='container my-3'>
            <div className='d-flex justify-content-center'>
                <div style={{'width':'555px'}}>
                    <div>
                        <h2 className='text-center text-success'>EUR/USD  Converter</h2>
                    </div>
                    <div className='form-group my-3'>
                        <div className='row'>
                            <div className='col-6'>
                                <label htmlFor='fx-rate'>FX Rate:</label>
                            </div>
                            <div className='col-6'>
                                <input
                                    type='text'
                                    id='fx-rate'
                                    className='form-control'
                                    value={fxRate}
                                    disabled
                                    onKeyPress={validNumber}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='form-group my-3'>
                        <div className='row'>
                            <div className='col-6'>
                                <label htmlFor='input-value'>Amount:</label>
                            </div>
                            <div className='col-6'>
                                <input
                                    type='text'
                                    id='input-value'
                                    className='form-control'
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyPress={validNumber}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='form-group my-3'>
                        <div className='row'>
                            <div className='col-6'>
                                <label htmlFor='currency'>Convert Into:</label>
                            </div>
                            <div className='col-6'>
                                <label className="radio-inline" style={{ marginRight: '15px' }}><input type="radio" name='currency' value='EUR' checked={switchValue === 'EUR' ? true : false} onChange={handleSwitchChange} />EUR</label>
                                <label className="radio-inline"><input type="radio" name='currency' value='USD' checked={switchValue === 'USD' ? true : false} onChange={handleSwitchChange} />USD</label>
                            </div>
                        </div>
                    </div>
                    <div className='form-group my-3'>
                        <div className='row'>
                            <div className='col-6'>
                                <label htmlFor='currency'>Override fx rate:</label>
                            </div>
                            <div className='col-6'>
                                <label className="radio-inline" style={{ marginRight: '15px' }}><input type="radio" name='override' value='Yes' checked={override === 'Yes' ? true : false} onChange={handleOverrideChange} />Yes</label>
                                <label className="radio-inline"><input type="radio" name='override' value='No' checked={override === 'No' ? true : false} onChange={handleOverrideChange} />No</label>
                            </div>
                        </div>
                    </div>
                    {override === 'Yes' &&
                     <div className='form-group my-3'>
                     <div className='row'>
                         <div className='col-6'>
                             <label htmlFor='override'>Override fx Value:</label>
                         </div>
                         <div className='col-6'>
                             <input
                             type='text'
                             className='form-control'
                             value={userFxRate}
                             onChange={e => setUserFxRate(e.target.value)}
                             onKeyPress={validNumber}
                             />
                 </div>
                 </div>
                 </div>
                    }
                    <div className='form-group my-3'>
                        <div className='text-center'>
                            <button onClick={convert} className='btn btn-success w-100'>Convert</button>
                        </div>
                    </div>
                    {
                        historicalData.length > 0 &&
                        <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>FX Rate</th>
                                        <th>Converted Amount</th>
                                        <th>Override</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historicalData.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.inputValue + " "}{data.switchValue == 'EUR' ? 'USD' : 'EUR'}</td>
                                            <td>{data.rate}</td>
                                            <td>{data.convertedValue + " " + data.switchValue}</td>
                                            <td>{data.overrideFlag}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Converter;







