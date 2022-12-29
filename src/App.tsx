import React, { ChangeEvent, useState } from 'react';
import { Container } from '@mui/system';
import { Button, Card, Stack, TextField } from '@mui/material';

export default function App() {
  const [state, setState] = useState({
    input: '',
    digit: '19',
    result: '',
  });

  const { input, digit, result } = state;

  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm" sx={{ paddingX: '0px' }}>
      <Card
        sx={{
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <TextField
            multiline
            rows={10}
            value={input}
            placeholder='012345678901234567890123456789
            "012345678901234567890123456789","CSV"
            a012345678901234567890123456789z'
            name="input"
            label="Input"
            onChange={updateValue}
          />
          <TextField
            value={digit}
            name="digit"
            label="Digit"
            type="number"
            onChange={updateValue}
          />
          <Button
            onClick={() => {
              // HACK
              const lineArr = input.trim().split('\n');
              const result = lineArr
                .map((line) => {
                  const REG_EXP = new RegExp(`\\d*(\\d{${digit}})`);
                  const regExpMatchArray = line.match(REG_EXP);

                  if (regExpMatchArray !== null) {
                    return regExpMatchArray[1];
                  }

                  return '';
                })
                .join('\n');

              setState({ ...state, result });
            }}
            variant="contained"
          >
            extract
          </Button>
          <TextField
            multiline
            rows={10}
            value={result}
            name="result"
            label="Result"
            onChange={updateValue}
          />
        </Stack>
      </Card>
    </Container>
  );
}
