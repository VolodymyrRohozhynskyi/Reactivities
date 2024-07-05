import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "./models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "./features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "./api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((res) => {
      setActivities(res);
      setLoading(false);
    });
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
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((i) => i.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string): void {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent />;

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
