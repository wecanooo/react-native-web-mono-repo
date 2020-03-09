import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

type ActionSheetProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  noSafeArea: boolean;
  rightAction?: {
    label: string;
    onPress: () => void;
  };
};

const ActionSheet = ({
  title,
  subtitle,
  children,
  noSafeArea,
  rightAction,
}: ActionSheetProps) => {
  const [animation, setAnimation] = useState<Animated.Value>(
    new Animated.Value(0),
  );
  const [visible, setVisible] = useState(false);

  return <View></View>;
};

ActionSheet.defaultProps = {
  noSafeArea: false,
};

export default ActionSheet;
