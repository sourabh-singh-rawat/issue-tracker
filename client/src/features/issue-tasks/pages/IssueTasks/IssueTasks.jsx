import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import TabPanel from "../../../../common/TabPanel";
import AddTask from "../../components/containers/AddTask";
import TaskList from "../../components/containers/TaskList";

import { setTasks } from "../../issue-tasks.slice";
import { useGetTasksQuery } from "../../issue-tasks.api";

const IssueTasks = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
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
        <TaskList
          title="To do:"
          rows={issueTasks.rows}
          loading={issueTasks.loading}
        />
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueTasks;
