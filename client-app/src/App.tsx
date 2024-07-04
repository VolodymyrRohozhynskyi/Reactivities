import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "./models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "./features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities/")
      .then((res) => setActivities(res.data));
  }, []);

  function handleSelectActivity(id: string): void {
    setSelectedActivity(activities.find((a) => a.id === id));
  }

  function handleCancelSelectActivity(): void {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string): void {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(): void {
    setEditMode(false);
  }

  function handleSubmitActivity(activity: Activity): void {
    activity.id
      ? null
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
  }

  function handleDeleteActivity(id: string): void {
    setActivities([...activities.filter((a) => a.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          submitActivity={handleSubmitActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
