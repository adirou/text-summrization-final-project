import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";
import api from '../../apiService';
import { Typography } from '@material-ui/core';

export default function ChooseFromExisting_TabPanel({
  onClose,
  permit,
}) {
  const history = useHistory();
  const [permKey, setPermKey] = useState('');
  const [experimentText, setExperimentText] = useState('');
  const [experiment, setExperiment] = useState();
  const [experiments, setExperiments] = useState([]);
  const [isKeyError, setKeyError] = useState(false);

  useEffect(() => {
    fetchExperiments();
  }, []);

  const fetchExperiments = async () => {
    const res = await api.getExperiments();
    setExperiments(res.data);
  }
  const validate = () => {
    permit(false);
    if (permKey === '1234') {
      permit();
      return true;
    }
    return false;
  }


  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'40vh'}}>
      <div>
        <Typography style={{color:'#aaaaaa'}}>Choose From Exisiting Research, and see related summaries, and tests</Typography>
        <Autocomplete
          id="choose-from-exisiting-experiment-select"
          style={{ width: '100%', marginRight: 10 }}
          options={experiments}
          autoHighlight
          getOptionLabel={option => option.id}
          renderInput={params => (
            <TextField
              {...params}
              label="Choose an experiment"
              fullWidth
              inputProps={{
                ...params.inputProps,
                autoComplete: 'disabled', // disable autocomplete and autofill
              }}
            />
          )}
          onChange={(e, experiment) =>
            setExperiment(experiment)
          }
          onInputChange={(e, value) =>
            setExperimentText(value)
          }
          inputValue={experimentText}

        />

        <TextField
          error={isKeyError}
          helperText=""
          autoFocus
          margin="dense"
          id="welcome-dialog-choose- permission-input"
          label="Enter Permission key"
          value={permKey}
          onChange={(e) => setPermKey(e.target.value)}
          type="password"
          fullWidth
        />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '30px 0 10px'
      }}>

        <Button
          disabled={!experiment}
          variant="contained"
          size="large"
          style={{ marginRight: '10px' }}
          onClick={() => {
            onClose && onClose();
            validate() ?
              history.push(`/experiments/${experiment.id}`) :
              setKeyError(true);
          }}
        >
          Research
            </Button>
      </div>
    </div>
  );
}