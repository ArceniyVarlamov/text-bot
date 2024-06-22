import { useState } from "react";
import axios, {AxiosError} from "axios"
import { IBotData } from "../interfaces";

export const useRate = () => {
  const [rate, setRate] = useState<IBotData | null>(null);
  const [error, setError] = useState<AxiosError | null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const post = async (textData: string) => {
    setLoading(true);
    setRate(null);
    setError(null);

    try {
      const response = await axios.post(
        `https://api.coze.com/open_api/v2/chat`, 
        {
          conversation_id: localStorage.getItem('userKey'), 
          bot_id: "7383248812989104134",
          user: localStorage.getItem('userKey'), 
          query: `оцени текст после символа на предмет наличия следов ии и его свойственных черт (использование странных символов или md и т.д.) и дай оценку, сколько текста составляет текст ии. Выведи только число от 0 до 100. Текст: ${textData}`, 
          stream: false
        }, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer pat_jWTnhcy0CQX2AbJWolsuOoMFw665oJ7mtxb5LWuJpNwpnPJW2UWudogRIRvPzkri`,
            'Connection': 'keep-alive',
            'Host': 'api.coze.com',
          }
        }
      );
      setRate(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new AxiosError('Ошибка в запросе к рейтингу'));
      }
    } finally {
      setLoading(false);
    }
  };

  return { rate, error, loading, post };
}