import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

type Player = 1 | 2 | null;

const Game = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [player, setPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | null>(null);
};