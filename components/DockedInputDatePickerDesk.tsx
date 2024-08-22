import React, { useMemo } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import TrailingIcon from "./TrailingIcon";
import TextField from "./TextField";
import { Border, FontFamily, FontSize, Color, Padding } from "../GlobalStyles";

export type DockedInputDatePickerDeskType = {
  showClearButton?: boolean;
  propBackgroundColor?: string;

  /** Style props */
  propTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const DockedInputDatePickerDesk = ({
  showClearButton = true,
  propTop,
  propBackgroundColor,
}: DockedInputDatePickerDeskType) => {
  const dockedInputDatePickerDeskStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  return (
    <View
      style={[styles.dockedInputDatePickerDesk, dockedInputDatePickerDeskStyle]}
    >
      <View style={styles.datePicker}>
        <View style={[styles.selectionRow, styles.selectionRowFlexBox]}>
          <View style={styles.monthDropDown}>
            <TrailingIcon
              icon={require("../assets/icon1.png")}
              propBackgroundColor={propBackgroundColor}
            />
            <View>
              <View style={[styles.stateLayer, styles.containerLayout1]}>
                <Text style={[styles.labelText, styles.labelTypo]}>Aug</Text>
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icon2.png")}
                />
              </View>
            </View>
            <TrailingIcon
              icon={require("../assets/icon3.png")}
              propBackgroundColor={propBackgroundColor}
            />
          </View>
          <View style={styles.monthDropDown}>
            <TrailingIcon
              icon={require("../assets/icon1.png")}
              propBackgroundColor={propBackgroundColor}
            />
            <View>
              <View style={[styles.stateLayer, styles.containerLayout1]}>
                <Text style={[styles.labelText, styles.labelTypo]}>2023</Text>
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icon2.png")}
                />
              </View>
            </View>
            <TrailingIcon
              icon={require("../assets/icon3.png")}
              propBackgroundColor={propBackgroundColor}
            />
          </View>
        </View>
        <View style={styles.calendarGrid}>
          <View style={styles.daysOfTheWeek}>
            <View style={[styles.sunday, styles.sundayLayout]}>
              <Text style={[styles.date, styles.dateTypo]}>S</Text>
            </View>
            <View style={[styles.sunday, styles.sundayLayout]}>
              <Text style={[styles.date, styles.dateTypo]}>M</Text>
            </View>
            <View style={[styles.sunday, styles.sundayLayout]}>
              <Text style={[styles.date, styles.dateTypo]}>T</Text>
            </View>
            <View style={[styles.sunday, styles.sundayLayout]}>
              <Text style={[styles.date, styles.dateTypo]}>W</Text>
            </View>
            <View style={[styles.sunday, styles.sundayLayout]}>
              <Text style={[styles.date, styles.dateTypo]}>T</Text>
            </View>
            <View style={[styles.sunday, styles.sundayLayout]}>
              <Text style={[styles.date, styles.dateTypo]}>F</Text>
            </View>
            <View style={[styles.sunday, styles.sundayLayout]}>
              <Text style={[styles.date, styles.dateTypo]}>S</Text>
            </View>
          </View>
          <View style={styles.week1}>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>26</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>27</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>28</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>29</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>30</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>31</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>1</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.week1}>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>2</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>3</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>4</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>5</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>6</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>7</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>8</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.week1}>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>9</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>10</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>11</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>12</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>13</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>14</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>15</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.week1}>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>16</Text>
                </View>
              </View>
            </View>
            <View style={styles.sundayLayout}>
              <View style={[styles.rangeHighlightEnd, styles.rangePosition]} />
              <View
                style={[styles.rangeHighlightStart, styles.rangePosition]}
              />
              <View style={[styles.container22, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date29, styles.dateTypo]}>17</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>18</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>19</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>20</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>21</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>22</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.week1}>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>23</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>24</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>25</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>26</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>27</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>28</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>29</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.week1}>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container6, styles.containerLayout]}>
                <View style={[styles.stateLayer8, styles.containerLayout]}>
                  <Text style={[styles.date, styles.dateTypo]}>30</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>1</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>2</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>3</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>4</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>5</Text>
                </View>
              </View>
            </View>
            <View style={[styles.sunday1, styles.sundayLayout]}>
              <View style={[styles.container, styles.containerLayout]}>
                <View style={[styles.stateLayer2, styles.containerLayout]}>
                  <Text style={[styles.date7, styles.dateTypo]}>6</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.localActions, styles.selectionRowFlexBox]}>
          {showClearButton && (
            <View style={[styles.clearButton, styles.containerLayout1]}>
              <View style={[styles.stateLayer44, styles.stateLayer44FlexBox]}>
                <Text style={[styles.labelText2, styles.labelTypo]}>Clear</Text>
              </View>
            </View>
          )}
          <View style={[styles.buttonContainer, styles.stateLayer44FlexBox]}>
            <View style={[styles.clearButton, styles.containerLayout1]}>
              <View style={[styles.stateLayer44, styles.stateLayer44FlexBox]}>
                <Text style={[styles.labelText2, styles.labelTypo]}>
                  Cancel
                </Text>
              </View>
            </View>
            <View style={[styles.primaryButton, styles.containerLayout1]}>
              <View style={[styles.stateLayer44, styles.stateLayer44FlexBox]}>
                <Text style={[styles.labelText2, styles.labelTypo]}>OK</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TextField
        inputText="08/17/2023"
        labelText="Date"
        supportingText="MM/DD/YYYY"
        showSupportingText
        propTop={8}
        propMarginLeft="unset"
        propLeft={0}
        propWidth={312}
        propBackgroundColor="rgba(73, 69, 79, 0.12)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectionRowFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  containerLayout1: {
    overflow: "hidden",
    borderRadius: Border.br_81xl,
  },
  labelTypo: {
    textAlign: "center",
    fontFamily: FontFamily.m3LabelLarge,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.m3LabelLarge_size,
  },
  sundayLayout: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  dateTypo: {
    fontFamily: FontFamily.m3BodySmall,
    lineHeight: 24,
    letterSpacing: 1,
    fontSize: FontSize.m3BodyLarge_size,
    textAlign: "center",
  },
  containerLayout: {
    width: 40,
    height: 40,
    flexDirection: "row",
  },
  rangePosition: {
    backgroundColor: Color.m3SysLightSecondaryContainer,
    top: "50%",
    width: "80%",
    marginTop: -20,
    height: 40,
    display: "none",
    position: "absolute",
  },
  stateLayer44FlexBox: {
    flex: 1,
    flexDirection: "row",
  },
  labelText: {
    color: Color.schemesOnSurfaceVariant,
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
  stateLayer: {
    paddingLeft: Padding.p_5xs,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_9xs,
    paddingBottom: Padding.p_3xs,
    borderRadius: Border.br_81xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  monthDropDown: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  selectionRow: {
    height: 64,
    alignItems: "center",
  },
  date: {
    color: Color.schemesOnSurface,
  },
  sunday: {
    borderRadius: Border.br_81xl,
    flexDirection: "row",
  },
  daysOfTheWeek: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  date7: {
    color: Color.schemesOnSurfaceVariant,
  },
  stateLayer2: {
    padding: Padding.p_3xs,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 40,
  },
  sunday1: {
    flexDirection: "row",
  },
  stateLayer8: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  container6: {
    height: 40,
    borderRadius: Border.br_81xl,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  week1: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  rangeHighlightEnd: {
    right: "48.75%",
    left: "-28.75%",
    zIndex: 0,
  },
  rangeHighlightStart: {
    right: "-31.25%",
    left: "51.25%",
    zIndex: 1,
  },
  date29: {
    color: Color.schemesOnPrimary,
  },
  container22: {
    backgroundColor: Color.schemesPrimary,
    zIndex: 2,
    marginTop: 10,
    height: 40,
    borderRadius: Border.br_81xl,
    overflow: "hidden",
  },
  calendarGrid: {
    paddingBottom: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    alignItems: "flex-end",
  },
  labelText2: {
    color: Color.schemesPrimary,
  },
  stateLayer44: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  clearButton: {
    height: 40,
    borderRadius: Border.br_81xl,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButton: {
    height: 40,
    marginLeft: 8,
    borderRadius: Border.br_81xl,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  localActions: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
  },
  datePicker: {
    top: 91,
    left: 0,
    borderRadius: Border.br_base,
    backgroundColor: Color.schemesSurfaceContainerHigh,
    display: "none",
    overflow: "hidden",
    position: "absolute",
  },
  dockedInputDatePickerDesk: {
    marginLeft: -155,
    top: 244,
    left: "50%",
    width: 312,
    height: 82,
    position: "absolute",
  },
});

export default DockedInputDatePickerDesk;
