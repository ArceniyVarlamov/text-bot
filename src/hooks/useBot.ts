import { useState } from "react";
import axios, {AxiosError} from "axios"
import { IBotData } from "../interfaces";

export const useBot = () => {
  const [textData, setTextData] = useState<IBotData | null>(null);
  const [error, setError] = useState<AxiosError | null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const post = async (textData: string, wantData: string) => {
    setLoading(true);
    setTextData(null);
    setError(null);

    try {
      const queryLang = /[a-zA-Z]/.test(textData) ? 'английском' : 'русском'

      const response = await axios.post(
        `https://api.coze.com/open_api/v2/chat`, 
        {
          conversation_id: localStorage.getItem('userKey'), 
          bot_id: "7380252447664586757",
          user: localStorage.getItem('userKey'), 
          query: `переделай текст на ${queryLang} языке в соответсвии со следующими пожеланиями: ${wantData}.Текст: ${textData}`, 
          stream: false
        }, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer pat_YAW9GPtPqtnY167yjtnT0tebGDZXQ90J3xgVPWuzuq1zc8Qlz0yrPog6WQykfmuu`,
            'Connection': 'keep-alive',
            'Host': 'api.coze.com',
          }
        }
      );

      setTextData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new AxiosError('Ошибка в запросе к тексту'));
      }
    } finally {
      setLoading(false);
    }
  };

  return { textData, error, loading, post };
}