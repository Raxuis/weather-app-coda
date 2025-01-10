import {Image, StyleSheet, Text} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/Accordion";
import {Link} from "expo-router";

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" className="text-blue-500">Welcome!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView>
                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <Text>What API am I using?</Text>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Text>We are using <Link href="https://openweathermap.org/" className="underline">Open
                                Weather</Link>.
                            </Text>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            <Text>Who am I?</Text>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Text>
                                I am Raphaël also known as <Link href="https://github.com/Raxuis" className="underline">Raxuis</Link>.
                            </Text>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
