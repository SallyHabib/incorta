import * as React from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

export default function CustomizedInput({
  title,
  value,
  optionsProps,
  defaultValue,
  onDeleteProp,
}) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [defaultValue],
    multiple: true,
    options: optionsProps,
    getOptionLabel: (option) => option.title,
  });
  const [valueState, setValueState] = React.useState(value);
  React.useEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{title}</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {valueState.map((option, index) => (
            <StyledTag
              key={index}
              label={option.title}
              onDelete={() =>
                onDeleteProp({ option: title, title: option.title })
              }
            />
          ))}

          <input {...getInputProps()} />
        </InputWrapper>
      </div>
    </Root>
  );
}
