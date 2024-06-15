import { useState } from "react";
import axios, {AxiosError} from "axios"
import { IBotData } from "../interfaces";

export const useBot = () => {
  const [BotData, setBotData] = useState<IBotData | null>(null);
  const [error, setError] = useState<AxiosError | null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const post = async (textData: string, wantData: string) => {
    setLoading(true);
    setBotData(null);
    setError(null);

    try {
      const response = await axios.post(
        `https://api.coze.com/open_api/v2/chat`, 
        {
          conversation_id: localStorage.getItem('userKey'), 
          bot_id: "7380252447664586757",
          user: localStorage.getItem('userKey'), 
          query: `(${textData}) переделай текст внутри скобок в соответсвии со следующими пожеланиями: ${wantData}`, 
          stream: false
        }, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_BOT_API_TOKEN}`,
            'Connection': 'keep-alive',
            'Host': 'api.coze.com',
          }
        }
      );

      setBotData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new AxiosError('Ошибка'));
      }
    } finally {
      setLoading(false);
    }
  };

  return { BotData, error, loading, post };
}