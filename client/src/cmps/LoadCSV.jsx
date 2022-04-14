import React, { useState } from 'react';

export function LoadCSV ({setSongList}) {

    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
  
    const fileReader = new FileReader();
  
    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const csvFileToArray = string => {
      const csvHeader = string.slice(0, string.indexOf('\n')).toLowerCase().split(',');
      const csvRows = string.slice(string.indexOf('\n') + 1).toLowerCase().split('\n');
        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        setSongList(array)
      setArray(array);
    };
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
  
      if (file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        };
        fileReader.readAsText(file);
      }
    };

    return(
        <div className='upload'>
        <form className='upload-csv'>
            <input
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={handleOnChange}
            />
            <button
                onClick={(e) => {
                    handleOnSubmit(e);
                }}
            >
                IMPORT CSV
            </button>
        </form>
    </div>
    )

}