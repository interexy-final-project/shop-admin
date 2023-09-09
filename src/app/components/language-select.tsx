import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState, SetStateAction, useEffect } from "react";
import i18n from "../../i18n";
import uk_flag from "../../assets/uk-flag.png";
import ru_flag from "../../assets/russia-flag-round-circle-icon.png";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<"ru" | "en">("ru");
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as SetStateAction<"ru" | "en">);
  };
  return (
    <FormControl>
      <Select variant="standard" value={language} onChange={handleChange}>
        <MenuItem value={"ru"}>
          <Stack direction={"row"} alignItems={"center"}>
            {t("language.russian")}
            {<Box width={20} component="img" src={ru_flag} />}
          </Stack>
        </MenuItem>
        <MenuItem value={"en"}>
          {t("language.english")}
          {<Box width={20} component="img" src={uk_flag} />}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
