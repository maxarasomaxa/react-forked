import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "dict.1.1.20261026T202807Z.f72da52fe0e7d7ac.586f6f27e86da017fdc36c97bb93ae8982bea0a2"; 

const doTranslation = async (input, languageCode, cancelToken) => {
  try {
    const { data } = await axios.get(
      "https://dictionary.yandex.net/api/v1/dicservice.json/lookup",
      {
        params: {
          key: API_KEY,
          lang: languageCode, // например, "en-ru"
          text: input
        },
        cancelToken: cancelToken.token
      }
    );

    // Извлекаем первый перевод из ответа Словаря
    if (data.def && data.def.length > 0 && data.def[0].tr) {
      return data.def[0].tr[0].text;
    }
    return "";
  } catch (err) {
    console.error("Ошибка перевода:", err);
    return "";
  }
};

export default ({ language, text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      return;
    }

    const cancelToken = axios.CancelToken.source();

    doTranslation(text, language, cancelToken).then(setTranslated);

    return () => {
      try {
        cancelToken.cancel();
      } catch (err) {}
    };
  }, [text, language]);

  return (
    <div>
      <label className="label">Output</label>
      <h1 className="title">{translated}</h1>
    </div>
  );
};