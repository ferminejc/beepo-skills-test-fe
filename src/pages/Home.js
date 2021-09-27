import React, { useEffect, useState } from 'react';
import CollapsibleTable from '../common/components/CollapsibleTable';
import Container from '@mui/material/Container';
import ciscoData from '../data/cisco.json';

const Home = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    return JSON.parse(JSON.stringify(ciscoData));
  };

  useEffect(() => {
    setData(getData().dataset);
  }, []);
  return (
    <Container maxWidth='lg' sx={{ mt: 10 }}>
      {data ? <CollapsibleTable data={data} /> : <></>}
    </Container>
  );
};

export default Home;
