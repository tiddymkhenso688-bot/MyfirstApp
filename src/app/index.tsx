import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

// ==========================================
// DISH TYPE
// ==========================================

type Dish = {
  id: string;
  name: string;
  type: string;
  price: string;
  description: string;
};

// ==========================================
// COLOURS
// ==========================================

const colors = {
  beige: "#D6C7BA",
  white: "#FFFFFF",
  brown: "#5D4638",
  blue: "#3B4B5C",
  black: "#121212",
  gray: "#777777",
  garnet:"#8C0902"
};


// ==========================================
// APP
// ==========================================


export default function App() {
  // ==========================================
  // DISH LIST
  // ==========================================

  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: "1",
      name: "Chicken Pops",
      type: "Starter",
      price: "25",
      description: "Fried small chicken balls",
    },
    {
      id: "2",
      name: "Meat Balls",
      type: "Starter",
      price: "30",
      description: "Mince meat rounded in a ball",
    },
    {
      id: "3",
      name: "Chicken Alfredo",
      type: "Main",
      price: "100",
      description: "Creamy chicken mushroom pasta",
    },
    {
      id: "4",
      name: "Grilled Chicken",
      type: "Main",
      price: "90",
      description: "Flaming hot chicken",
    },
    {
      id: "5",
      name: "Vanilla Cake",
      type: "Dessert",
      price: "55",
      description: "Classic tendered cake",
    },
    {
      id: "6",
      name: "Chocolate Munchkins",
      type: "Dessert",
      price: "50",
      description: "Chocolate donut sweet holes",
    },
  ]);

  // ==========================================
  // SCREEN STATE
  // ==========================================

  const [screen, setScreen] = useState<
    "menu" | "add" | "view"
  >("menu");

  // ==========================================
  // SELECTED DISH
  // ==========================================

  const [selectedDish, setSelectedDish] =
    useState<Dish | null>(null);

  // ==========================================
  // FORM INPUTS
  // ==========================================

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  // ==========================================
  // OPEN DISH DETAILS
  // ==========================================

  const openDish = (dish: Dish) => {
    setSelectedDish(dish);
    setScreen("view");
  };

  // ==========================================
  // SAVE DISH
  // ==========================================

  const saveDish = () => {
    // Check if all fields are completed
    if (
      name.trim() === "" ||
      price.trim() === "" ||
      type.trim() === "" ||
      description.trim() === ""
    ) {
      Alert.alert(
        "Error",
        "Please fill in all fields."
      );

      return;
    }

    // Create new dish
    const newDish: Dish = {
      id: Date.now().toString(),
      name: name,
      type: type,
      price: price,
      description: description,
    };

    // Add dish to menu
    setDishes([...dishes, newDish]);

    // Clear form
    setName("");
    setPrice("");
    setType("");
    setDescription("");

    // Success message
    Alert.alert(
      "Success",
      "Dish added successfully!"
    );

    // Go back to menu
    setScreen("menu");
  };

  // ==========================================
  // CANCEL ADDING DISH
  // ==========================================

  const cancelDish = () => {
    setName("");
    setPrice("");
    setType("");
    setDescription("");

    setScreen("menu");
  };

  // ==========================================
  // MENU SCREEN
  // ==========================================

  if (screen === "menu") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.menuContainer}>

          
        <Image source={require("../../assets/MAST_Logo-removebg-preview.png")}
          style={{width: 60, height: 60, alignSelf: "center", marginBottom: 8, borderRadius: 25 }} />
         
          {/* TITLE */}
          <Text style={styles.menuTitle}>
            My Menu
          </Text>

         
            
         
          
          

         

          {/* DISH LIST */}
          <FlatList
            style={{ flex: 1 }}
            data={dishes}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dishCard}
                onPress={() => openDish(item)}
              >
                <View>
                  <Text style={styles.dishName}>
                    {item.name}
                  </Text>

                  <Text style={styles.dishType}>
                    {item.type}
                  </Text>
                </View>

                <Text style={styles.dishPrice}>
                  R {item.price}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* ADD DISH BUTTON */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setScreen("add")}
          >
            <Text style={styles.buttonText}>
              + Add Dish
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // ADD NEW DISH SCREEN
  // ==========================================

  if (screen === "add") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.addContainer}>

            {/* BACK AND TITLE */}
            <TouchableOpacity
              onPress={() => setScreen("menu")}
            >
              <Text style={styles.addTitle}>
                ← Add New Dish
              </Text>
            </TouchableOpacity>

            {/* IMAGE + INPUTS */}
            <View style={styles.topRow}>

              {/* IMAGE BOX */}
              <View style={styles.imageBox}>
                <Text style={styles.imageText}>
                  Image
                </Text>
              </View>

              {/* NAME AND PRICE */}
              <View style={styles.rightInputs}>

                <TextInput
                  placeholder="Enter dish name"
                  value={name}
                  onChangeText={setName}
                  style={styles.smallInput}
                />

                <TextInput
                  placeholder="Enter price"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  style={styles.smallInput}
                />

              </View>

            </View>

            {/* TYPE */}
            <Text style={styles.label}>
              Select Type
            </Text>

            <TextInput
              placeholder="Starter / Main / Dessert"
              value={type}
              onChangeText={setType}
              style={styles.fullInput}
            />

            {/* DESCRIPTION */}
            <Text style={styles.label}>
              Description
            </Text>

            <TextInput
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              style={styles.descriptionInput}
            />

            {/* BUTTONS */}
            <View style={styles.buttonRow}>

              {/* SAVE */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveDish}
              >
                <Text style={styles.buttonText}>
                  Save
                </Text>
              </TouchableOpacity>

              {/* CANCEL */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelDish}
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // VIEW DISH DETAILS SCREEN
  // ==========================================

  if (screen === "view" && selectedDish) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.detailsContainer}>

          {/* BACK BUTTON AND DISH NAME */}
          <TouchableOpacity
            onPress={() => setScreen("menu")}
          >
            <Text style={styles.detailsTitle}>
              ← {selectedDish.name}
            </Text>
          </TouchableOpacity>

          {/* IMAGE PLACEHOLDER */}
          <View style={styles.bigImageBox}>
            <Text style={styles.imageText}>
              Image
            </Text>
          </View>

          {/* TYPE */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Type:
            </Text>

            <Text style={styles.infoText}>
              {selectedDish.type}
            </Text>
          </View>

          {/* PRICE */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Price:
            </Text>

            <Text style={styles.infoText}>
              R {selectedDish.price}
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Description:
            </Text>

            <Text
              style={[
                styles.infoText,
                styles.descriptionText,
              ]}
            >
              {selectedDish.description}
            </Text>
          </View>

          {/* RETURN BUTTON */}
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => setScreen("menu")}
          >
            <Text style={styles.buttonText}>
              Return
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  return null;
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({

  // ==========================================
  // MAIN
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: colors.beige,
    padding: 16,
  },

  // ==========================================
  // MENU
  // ==========================================

  menuContainer: {
    flex: 1,
    backgroundColor: colors.blue,
    margin: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,
  },

  menuTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.garnet,
    marginBottom: 25,
  },

  listContainer: {
    paddingBottom: 100,
  },

  dishCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color:colors.blue,

    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,

    padding: 15,
    marginBottom: 15,
  },

  dishName: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.white,
  },

  dishType: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 3,
  },

  dishPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },

  // ==========================================
  // ADD BUTTON
  // ==========================================

  addButton: {
    backgroundColor: colors.gray,

    paddingVertical: 12,
    paddingHorizontal: 30,

    borderRadius: 25,

    alignSelf: "center",

    marginTop: 10,
    marginBottom: 10,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  // ==========================================
  // ADD SCREEN
  // ==========================================

  addContainer: {
    backgroundColor: colors.blue,

    margin: 15,
    padding: 20,

    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,

    minHeight: 600,
  },

  addTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 30,
  },

  topRow: {
    flexDirection: "row",
    marginBottom: 25,
  },

  imageBox: {
    width: 120,
    height: 120,

    borderWidth: 1,
    borderColor: colors.black,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.beige,
  },

  imageText: {
    fontSize: 18,
    color: colors.brown,
  },

  rightInputs: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },

  smallInput: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,

    padding: 12,
    fontSize: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,

    marginBottom: 8,
    marginTop: 10,
  },

  fullInput: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,

    padding: 12,
    fontSize: 15,

    marginBottom: 15,
  },

  descriptionInput: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,

    height: 100,

    padding: 12,

    fontSize: 15,

    textAlignVertical: "top",
  },

  // ==========================================
  // SAVE AND CANCEL
  // ==========================================

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",

    marginTop: 40,
  },

  saveButton: {
    backgroundColor: colors.gray,

    paddingVertical: 12,
    paddingHorizontal: 35,

    borderRadius: 25,
  },

  cancelButton: {
    backgroundColor: colors.white,

    borderWidth: 1,
    borderColor: colors.black,

    paddingVertical: 12,
    paddingHorizontal: 30,

    borderRadius: 25,
  },

  cancelText: {
    color: colors.black,
    fontSize: 16,
  },

  // ==========================================
  // DETAILS SCREEN
  // ==========================================

  detailsContainer: {
    flex: 1,

    backgroundColor: colors.blue,

    margin: 15,
    padding: 20,

    borderWidth: 1,
    borderColor: colors.black,

    borderRadius: 5,
  },

  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,

    marginBottom: 30,
  },

  bigImageBox: {
    width: "80%",
    height: 180,

    borderWidth: 1,
    borderColor: colors.black,

    justifyContent: "center",
    alignItems: "center",

    alignSelf: "center",

    backgroundColor: colors.beige,

    marginBottom: 35,
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  infoLabel: {
    width: 110,

    fontSize: 16,
    fontWeight: "bold",

    color: colors.white,
  },

  infoText: {
    fontSize: 16,
    color: colors.white,
  },

  descriptionText: {
    flex: 1,
  },

  returnButton: {
    backgroundColor: colors.gray,

    paddingVertical: 12,
    paddingHorizontal: 35,

    borderRadius: 25,

    alignSelf: "center",

    marginTop: 40,
  },

});