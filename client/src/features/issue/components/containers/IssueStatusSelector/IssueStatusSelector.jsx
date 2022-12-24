/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from 'react-redux';

import { lighten, styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiSelect from '@mui/material/Select';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormHelperText from '@mui/material/FormHelperText';
import Label from '../../../../../common/utilities/Label/Label';
import theme from '../../../../../config/mui.config';

const StyledSelect = styled(MuiSelect)(({ statuscolor = '#000' }) => ({
  '&.MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    fontSize: '13px',
    fontWeight: 500,
    textTransform: 'capitalize',
    borderRadius: '6px',
    transitionDuration: '350ms',
    backgroundColor: lighten(statuscolor, 0.9),
    '& fieldset': {
      transitionDuration: '350ms',
      border: `2px solid ${lighten(statuscolor, 0.8)}`,
    },
    '&:hover fieldset': {
      backgroundColor: 'transparent',
      border: `2px solid ${lighten(statuscolor, 0.2)}`,
      transitionDuration: '350ms',
    },
  },
}));

const StyledMenuItem = styled(MuiMenuItem)(() => ({
  '&.MuiMenuItem-root': {
    ':hover': {
      backgroundColor: 'action.hover',
    },
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

function IssueStatusSelector({
  title,
  value,
  variant,
  helperText,
  handleChange,
  isLoading,
}) {
  const issueStatus = useSelector((store) => store.issue.options.status.rows);

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12}>
          {isLoading ? <MuiSkeleton width="20%" /> : <Label title={title} />}
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {isLoading ? (
          <MuiSkeleton />
        ) : (
          <MuiFormControl fullWidth>
            <StyledSelect
              name="status"
              size="small"
              value={value}
              onChange={handleChange}
              statuscolor={
                issueStatus.find((status) => status.id === value)?.color
              }
              sx={{
                color: theme.palette.grey[700],
                height: variant === 'dense' ? '28px' : 'auto',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'capitalize',
                '&:hover': {
                  boxShadow: `0 1px 4px 0 ${theme.palette.grey[400]}`,
                },
              }}
              displayEmpty
            >
              {issueStatus.map(({ id, name, color }) => (
                <StyledMenuItem key={id} value={id}>
                  <MuiTypography
                    variant="body2"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    sx={{
                      color,
                      fontSize: '13px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {name}
                  </MuiTypography>
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </MuiFormControl>
        )}
      </MuiGrid>
      {helperText && (
        <MuiGrid item xs={12}>
          {isLoading ? (
            <MuiSkeleton width="50%" height="75%" />
          ) : (
            <MuiFormHelperText>
              <MuiTypography component="span" sx={{ fontSize: '13px' }}>
                {helperText}
              </MuiTypography>
            </MuiFormHelperText>
          )}
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default IssueStatusSelector;
