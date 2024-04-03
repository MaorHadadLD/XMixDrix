import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, Text, ImageBackground } from 'react-native';

type Player = 1 | 2 | null;

const Game = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [player, setPlayer] = useState<Player>(1);
    const [winner, setWinner] = useState<Player | null>(null);

    const handlePress = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const newPlayer = player === 1 ? 2 : 1;
        setPlayer(newPlayer);

        const isWinner = checkWinner(newBoard, player);
        if (isWinner) {
            setWinner(player);
            Alert.alert(`Player ${player} wins!`, undefined, [
                { text: 'Play Again', onPress: resetGame },
            ]);
        } else if (!newBoard.includes(null)) {
            Alert.alert("It's a draw!", undefined, [
                { text: 'Play Again', onPress: resetGame },
            ]);
        }
    };

    const checkWinner = (board: Player[], player: Player) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some((combination) =>
            combination.every((index) => board[index] === player)
        );
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setPlayer(1);
        setWinner(null);
    };

    return (
        <ImageBackground
            source={require('../assets/XmixDrix.png')}
            style={styles.container}
            imageStyle={{ resizeMode: 'cover' }}
        >
            <Text style={styles.turnText}>
                {player === 1 ? "X's turn to play" : "O's turn to play"}
            </Text>
            <View style={styles.board}>
                {board.map((value, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.cell}
                        onPress={() => handlePress(index)}
                    >
                        {value === 1 ? (
                            <Image source={require('../assets/letter-x_9416305.png')} style={styles.image} />
                        ) : value === 2 ? (
                            <Image source={require('../assets/letter-o_8150900.png')} style={styles.image} />
                        ) : null}
                    </TouchableOpacity>
                ))}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    turnText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white', // adjust the text color to make it visible on the background
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 300,
        height: 300,
    },
    cell: {
        width: '33.33%',
        height: '33.33%',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // add a semi-transparent background to the cells for better visibility
    },
    image: {
        width: 50,
        height: 50,
    },
});
export default Game;
