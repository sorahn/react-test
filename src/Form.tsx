import React, { ChangeEventHandler, FormEventHandler, useCallback, useContext, useState } from "react";
import { ClientContext } from "./App";

type Props = {
  setRedditData: React.Dispatch<any>;
};

const useForm = ({ setRedditData }: Props) => {
  const { client } = useContext(ClientContext);

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [redditError, setRedditError] = useState<any>(null);

  const randomWait = async (min: number, max: number) => {
    const time = Math.floor(Math.random() * max - min) + min;
    await new Promise((resolve) => setTimeout(resolve, time));
  };

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setUsername(e.target.value),
    []
  );

  const handleFormSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);

        // simulate some time passage
        await randomWait(1000, 2000);
        const response = await client(`https://www.reddit.com/user/${username}.json`).then((r) => r.json());

        setRedditError(null);
        setRedditData(JSON.stringify(response.data, null, 2));
      } catch (error: any) {
        setRedditError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [username, client, setRedditData, setRedditError]
  );

  return {
    username,
    handleUsernameChange,
    loading,
    handleFormSubmit,
    redditError,
  };
};

export const Form = (props: Props) => {
  const { setRedditData } = props;
  const { username, handleUsernameChange, handleFormSubmit, loading, redditError } = useForm({ setRedditData });

  return (
    <form onSubmit={handleFormSubmit}>
      <label>reddit username:</label>
      <br />
      <input placeholder="enter a reddit username" value={username} onChange={handleUsernameChange} autoFocus />
      {redditError && (
        <>
          <br />
          <small style={{ color: "red" }}>{redditError}</small>
        </>
      )}
      <br />
      <button type="submit" disabled={loading}>
        {loading && <i className="fa fa-spinner fa-spin fa-fw"></i>}
        submit
      </button>
    </form>
  );
};
