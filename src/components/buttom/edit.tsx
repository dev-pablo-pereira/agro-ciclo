import { Button, Icon } from "@rneui/themed";
import React from "react";

interface EditProps {
  onPress: () => void;
}

export default function EditButton({ onPress }: EditProps) {
  return (
    <Button type="clear" onPress={onPress}>
      <Icon name="pencil" type="evilicon" size={30} color={"#FFEB3B"} />
    </Button>
  );
}
