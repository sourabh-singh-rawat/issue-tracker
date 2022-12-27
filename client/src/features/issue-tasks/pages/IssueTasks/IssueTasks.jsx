import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import TabPanel from "../../../../common/tabs/TabPanel";
import TaskList from "../../components/containers/TaskList";

import { setTasks } from "../../slice/issue-tasks.slice";
import { useGetTasksQuery } from "../../api/issue-tasks.api";

const IssueTasks = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const issueTasks = useSelector((store) => store.issueTasks);

  const getTasksQuery = useGetTasksQuery({ id });

  useEffect(() => {
    if (getTasksQuery.isSuccess) {
      dispatch(setTasks(getTasksQuery.data));
    }
  }, [getTasksQuery.data]);

  return (
    <TabPanel selectedTab={selectedTab} index={1}>
      <MuiGrid container rowSpacing={3}>
        <MuiGrid item xs={12}>
          <TaskList
            title="To do:"
            rows={issueTasks.rows}
            rowCount={issueTasks.rowCount}
            isLoading={issueTasks.isLoading}
          />
        </MuiGrid>
        {/* Completed Issue Tasks */}
        <MuiGrid item xs={12}></MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueTasks;