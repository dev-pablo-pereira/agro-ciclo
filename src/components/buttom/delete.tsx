import { Button, Icon } from "@rneui/themed";
import React from "react";

interface DeleteButtonProps {
    onPress: () => void
}

export default function DeleteButton({onPress}:DeleteButtonProps) {
  return (
    <Button type="clear" onPress={onPress}>
      <Icon name="trash" type="evilicon" color={"red"} size={30}/>
    </Button>
  );
}
