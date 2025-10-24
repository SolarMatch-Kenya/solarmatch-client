// please do not delete this File, I added it to test and remember how the notification works

import { toast } from "sonner";

function Example() {
  return (
    <button onClick={() => toast.success("Event has been created!")}>
      Show Toast
    </button>
  );
}

export default Example;