import {View,Text,Button, Pressable } from "react-native";


type ButtonProps = {
  title: string;
  onPressed: () => void;
};

const MenuCard = (props:ButtonProps) => { {
  return (
  <Pressable className="m-4 p-4 rounded-lg shadow-lg bg-white w-[150px]" onPress={props.onPressed} >
    <Text className="font-medium text-center">{props.title}</Text>
  </Pressable>);
}};

export default MenuCard;