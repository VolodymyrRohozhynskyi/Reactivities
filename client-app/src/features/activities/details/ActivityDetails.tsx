import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Icon,
  Image,
} from "semantic-ui-react";
import { Activity } from "../../../models/activity";

interface Prop {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

function ActivityDetails({ activity, cancelSelectActivity, openForm }: Prop) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <ButtonGroup widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(activity.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelSelectActivity}
          />
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}

export default ActivityDetails;
