import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="space-y-4">
      <TextField.Root placeholder="Title" className="max-w-xl" />
      <TextArea placeholder="Description" className="max-w-xl" />
      <Button>New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
