import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "dict.1.1.20261026T202807Z.f72da52fe0e7d7ac.586f6f27e86da017fdc36c97bb93ae8982bea0a2"; 

const doTranslation = async (input, cancelToken) => {
  try {
    // Если в тексте есть русские буквы, переводим ru-en, иначе en-ru
    const isCyrillic = /[а-яё]/i.test(input);
    const langPair = isCyrillic ? "ru-en" : "en-ru";

    const { data } = await axios.get(
      "https://dictionary.yandex.net/api/v1/dicservice.json/lookup",
      {
        params: {
          key: API_KEY,
          lang: langPair, // <-- ТЕПЕРЬ ЗДЕСЬ ПАРА ЯЗЫКОВ
          text: input
        },
        cancelToken: cancelToken.token
      }
    );

    if (data.def && data.def.length > 0 && data.def[0].tr) {
      return data.def[0].tr[0].text;
    }
    return "Слово не найдено";
  } catch (err) {
    console.error(err);
    return "Ошибка перевода";
  }
};

// Убираем language из параметров, чтобы он не мешал
export default ({ text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      setTranslated("");
      return;
    }

    const cancelToken = axios.CancelToken.source();
    
    // Небольшая задержка, чтобы не отправлять запрос на каждую букву
    const timeoutId = setTimeout(() => {
        doTranslation(text, cancelToken).then(setTranslated);
    }, 500); 

    return () => {
      clearTimeout(timeoutId);
      try { cancelToken.cancel(); } catch (err) {}
    };
  }, [text]); // Убрали language из зависимостей

  return (
    <div>
      <label className="label">Output</label>
      <h1 className="title">{translated}</h1>
    </div>
  );
};