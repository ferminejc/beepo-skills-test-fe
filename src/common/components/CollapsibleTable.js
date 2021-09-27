import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dateFormat from 'dateformat';
import Graph from './Graph';

const createData = (
  MaintenanceVendorImageURL,
  MinimumStartDate,
  ContractNumber,
  NumberOfAssets,
  MaximumEndDate,
  NumberOfMajorAssets,
  NumberOfSupportTypes,
  AssetsUnderActiveCoverage,
  AssetsUnderExpiredCoverage,
  AssetsUnderSignedCoverage,
  EndDates
) => {
  return {
    MaintenanceVendorImageURL,
    MinimumStartDate,
    ContractNumber,
    NumberOfAssets,
    MaximumEndDate,
    NumberOfMajorAssets,
    NumberOfSupportTypes,
    AssetsUnderActiveCoverage,
    AssetsUnderExpiredCoverage,
    AssetsUnderSignedCoverage,
    EndDates,
  };
};

const Row = (props) => {
  const { row } = props || {};
  const endDates = row.EndDates.map((e) => {
    return {
      ...e,
    };
  });
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        hover={true}
        onClick={() => setOpen(!open)}
      >
        <TableCell align='center' sx={{ minWidth: 100 }}>
          <Box
            component='img'
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 25, md: 40 },
              maxWidth: { xs: 50, md: 80 },
            }}
            alt='The house from the offer.'
            src={`${row.MaintenanceVendorImageURL}`}
          />
        </TableCell>
        <TableCell align='center' sx={{ minWidth: 100 }}>
          {row.ContractNumber}
        </TableCell>
        <TableCell align='center' sx={{ minWidth: 100 }}>
          <h5 sx={{ mb: 10 }}>ASSETS:</h5>
          <div>{row.NumberOfAssets}</div>
        </TableCell>
        <TableCell align='center' sx={{ minWidth: 100 }}>
          <h5>MINIMUM START DATE</h5>
          <div>{dateFormat(row.MinimumStartDate, 'mmm dd yyyy')}</div>
        </TableCell>
        <TableCell align='center' sx={{ minWidth: 100 }}>
          <h5>MAXIMUM START DATE</h5>{' '}
          {dateFormat(row.MaximumEndDate, 'mmm dd yyyy')} {}
        </TableCell>
        <TableCell align='center' sx={{ minWidth: 50 }}>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {open ? (
        <>
          <TableRow key={new Date() + 1000}>
            <TableCell sx={{ minWidth: 140 }}>
              <h5>NUMBER OF ASSETS</h5>
              <div>{row.NumberOfAssets ? row.NumberOfAssets : '--'}</div>
            </TableCell>
            <TableCell sx={{ minWidth: 170 }}>
              <h5>NUMBER OF MAJOR ASSETS</h5>
              <div>
                {' '}
                {row.NumberOfMajorAssets ? row.NumberOfMajorAssets : '--'}
              </div>
            </TableCell>
            <TableCell align='right' sx={{ minWidth: 200 }}>
              <h5>NUMBER OF SUPPORT TYPES</h5>
              <div>
                {row.NumberOfSupportTypes ? row.NumberOfSupportTypes : '--'}
              </div>
            </TableCell>
            <TableCell align='right' sx={{ minWidth: 220 }}>
              <h5>MAJOR ASSETS (ACTIVE COVERAGE)</h5>
              <div>
                {row.AssetsUnderActiveCoverage
                  ? row.AssetsUnderActiveCoverage
                  : '--'}
              </div>
            </TableCell>
            <TableCell align='right' sx={{ minWidth: 230 }}>
              <h5>MAJOR ASSETS (EXPIRED COVERAGE)</h5>
              <div>
                {row.AssetsUnderExpiredCoverage
                  ? row.AssetsUnderExpiredCoverage
                  : '--'}
              </div>
            </TableCell>
            <TableCell align='right' sx={{ minWidth: 230 }}>
              <h5>MAJOR ASSETS (SIGNED COVERAGE)</h5>
              <div>
                {row.AssetsUnderSignedCoverage
                  ? row.AssetsUnderSignedCoverage
                  : '--'}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <Graph endDates={endDates} />
            </TableCell>
          </TableRow>
        </>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    MaintenanceVendorImageURL: PropTypes.string,
    ContractNumber: PropTypes.string,
    NumberOfAssets: PropTypes.number,
    MinimumStartDate: PropTypes.string,
    MaximumEndDate: PropTypes.string,
    EndDates: PropTypes.arrayOf(
      PropTypes.shape({
        ExpiryDate: PropTypes.string,
        ExpiryDateLabel: PropTypes.string,
        NumberOfExpiryItems: PropTypes.number,
      })
    ),
  }),
};

const CollapsibleTable = (props) => {
  const { data } = props;
  let rows = data?.map((e, index) => {
    return createData(
      e.MaintenanceVendorImageURL,
      e.MinimumStartDate,
      e.ContractNumber,
      e.NumberOfAssets,
      e.MaximumEndDate,
      e.NumberOfMajorAssets,
      e.NumberOfSupportTypes,
      e.AssetsUnderActiveCoverage,
      e.AssetsUnderExpiredCoverage,
      e.AssetsUnderSignedCoverage,
      e.EndDates
    );
  });
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table aria-label='collapsible table'>
          <TableBody>
            {rows ? (
              <>
                {rows?.map((row, index) => (
                  <Row key={row.name + '' + index} row={row} />
                ))}
              </>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CollapsibleTable;
