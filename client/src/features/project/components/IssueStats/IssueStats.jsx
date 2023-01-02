/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React from 'react';

import MuiGrid from '@mui/material/Grid';
import theme from '../../../../config/mui.config';

import IssueCard from '../IssueCard';

function IssueStats({ issuesStatusCount }) {
  const total = issuesStatusCount.reduce(
    (prev, cur) => prev + parseInt(cur.count, 10),
    0,
  );

  const totalWeeklyCount = issuesStatusCount.reduce(
    (prev, cur) => prev + parseInt(cur.weeklyCount, 10),
    0,
  );

  return (
    <MuiGrid
      columnSpacing={2}
      rowSpacing={1}
      sx={{ marginTop: '8px', marginBottom: '20px' }}
      container
    >
      <MuiGrid md={2.4} xs={12} item>
        <IssueCard
          backgroundColor={theme.palette.primary[900]}
          color={theme.palette.common.white}
          count={total}
          title="Total Issues"
          weeklyCount={totalWeeklyCount}
        />
      </MuiGrid>
      {issuesStatusCount.map(({ id, name, count, weeklyCount }) => (
        <MuiGrid key={id} md={2.4} sm={4} xs={6} item>
          <IssueCard count={count} title={name} weeklyCount={weeklyCount} />
        </MuiGrid>
      ))}
    </MuiGrid>
  );
}

export default IssueStats;
