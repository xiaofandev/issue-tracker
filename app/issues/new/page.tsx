import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button>New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
