import { Modal, StyleSheet, Text, View, Button, Pressable } from "react-native";
import { Card, Icon, Input, Rating } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postComments } from "../comments/commentsSlice";
//alright, we are doing okay...pick it back up tomorrow.h
const RenderCampsite = (props) => {
  const { campsite } = props;
  const dispatch = useDispatch();
  const resetForm = () => {
    const reset = () => {
      setRating({
        rating: 5,
        author: "",
        text: "",
      });
    };
    reset();
  };

  const [rating, setRating] = useState({ rating: 5, author: "", text: "" });

  const handleSubmit = () => {
    const newComment = {
      ...rating,
      campsiteId: campsite.id,
    };
    dispatch(postComments(newComment));
    resetForm();
    props.onShowModal();
  };

  if (campsite) {
    return (
      <>
        <Card containerStyle={styles.cardContainer}>
          <Card.Image source={{ uri: baseUrl + campsite.image }}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={styles.cardText}>{campsite.name}</Text>
            </View>
          </Card.Image>
          <Text style={{ margin: 20 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={props.isFavorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              raised
              reverse
              onPress={() =>
                props.isFavorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite()
              }
            />
            <Icon
              name={"pencil"}
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
          </View>
        </Card>
        <Modal visible={props.showModal}>
          <View style={styles.modal}>
            <View style={{ margin: 10 }}>
              <Rating
                showRating
                startingValue={5}
                imageSize={40}
                onFinishRating={(newRating) =>
                  setRating({ ...rating, rating: newRating })
                }
                style={{ paddingVertical: 10 }}
                value={rating.rating}
              />
              <Input
                placeholder="Author"
                leftIcon="user-o"
                leftIconContainerStyle={{ paddingRight: 10 }}
                onChangeText={(newAuthor) =>
                  setRating({ ...rating, author: newAuthor })
                }
                value={rating.author}
              ></Input>
              <Input
                placeholder="Comment"
                leftIcon="comment-o"
                leftIconContainerStyle={{ paddingRight: 10 }}
                onChangeText={(newText) =>
                  setRating({ ...rating, text: newText })
                }
                value={rating.text}
              ></Input>
              <View style={{ backgroundColor: "#5637DD", margin: 10 }}>
                <Button
                  title="Submit"
                  onPress={() => handleSubmit()}
                  color="white"
                />
              </View>
              <View style={{ backgroundColor: "#808080", margin: 10 }}>
                <Button
                  style={styles.button}
                  color="white"
                  onPress={() => {
                    props.onShowModal();
                    resetForm();
                  }}
                  title="Cancel"
                ></Button>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
  return <View />;
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  button: {
    color: "#808080",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardText: {
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});

export default RenderCampsite;
