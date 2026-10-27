import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "dict.1.1.20261026T202807Z.f72da52fe0e7d7ac.586f6f27e86da017fdc36c97bb93ae8982bea0a2"; 

const doTranslation = async (input, cancelToken) => {
  try {
    const isCyrillic = /[а-яё]/i.test(input);
    const langPair = isCyrillic ? "ru-en" : "en-ru";

    const { data } = await axios.get(
      "https://dictionary.yandex.net/api/v1/dicservice.json/lookup",
      {
        params: { key: API_KEY, lang: langPair, text: input },
        cancelToken: cancelToken.token
      }
    );

    if (data.def && data.def.length > 0 && data.def[0].tr) {
      return data.def[0].tr[0].text;
    }
    return "";
  } catch (err) {
    return "";
  }
};

export default ({ text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      setTranslated("");
      return;
    }

    const cancelToken = axios.CancelToken.source();
    // Убрали setTimeout, чтобы перевод появлялся моментально
    doTranslation(text, cancelToken).then(setTranslated);

    return () => {
      try { cancelToken.cancel(); } catch (err) {}
    };
  }, [text]);

  // Возвращаем только один h1 и ничего больше
  return <h1>{translated}</h1>;
};