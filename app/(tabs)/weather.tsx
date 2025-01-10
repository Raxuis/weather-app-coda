import {StyleSheet, Image, View, RefreshControl} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Input} from "@/components/Input";
import {Button} from "@/components/Button";
import {Text} from "@/components/Text";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/Card";
import {
    ArrowDown,
    ArrowUp,
    Droplet,
    LoaderCircleIcon,
    WindIcon
} from "lucide-react-native";

type WeatherType = {
    main: string;
    description: string;
};

type WeatherData = {
    main: MainWeatherData;
    wind: WindData;
    clouds: Clouds;
    name: string;
    weather: WeatherType[];
};


type MainWeatherData = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

type WindData = {
    speed: number;
    deg: number;
}

type Clouds = {
    all: number;
}

export default function TabTwoScreen() {
    const [city, setCity] = useState<string>("");
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [iconUrl, setIconUrl] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);

    const iconMap: Record<string, any> = {
        "clouds.png": require('@/assets/images/clouds.png'),
        "clear.png": require('@/assets/images/clear.png'),
        "snow.png": require('@/assets/images/snow.png'),
        "rain.png": require('@/assets/images/rain.png'),
        "mist.png": require('@/assets/images/mist.png'),
        "drizzle.png": require('@/assets/images/drizzle.png'),
    };


    const fetchWeatherDatas = async () => {
        setIsLoading(true);
        const apiKey = process.env.API_KEY!;
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        await axios
            .get(apiURL + city + `&appid=${apiKey}`)
            .then((res) => {
                setWeatherData(res.data);
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchWeatherDatas();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        if (!weatherData?.weather || weatherData.weather.length === 0) return;

        const mainWeather = weatherData.weather[0].main;
        const weatherToIconMap: Record<string, string> = {
            Clouds: "clouds.png",
            Clear: "clear.png",
            Snow: "snow.png",
            Rain: "rain.png",
            Mist: "mist.png",
            Drizzle: "drizzle.png",
        };

        setIconUrl(weatherToIconMap[mainWeather] || "default.png");
    }, [weatherData]);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
            headerImage={
                <Image
                    source={require('@/assets/images/weather.jpg')}
                    className="size-full"
                />
            }
        >
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Weather</ThemedText>
            </ThemedView>
            <ThemedText className="text-slate-500">
                Here you'll can get the weather corresponding to your desired city.
            </ThemedText>
            <ThemedView className="flex flex-col items-start">
                <ThemedText type="default">Weather</ThemedText>
                <Input
                    className="mt-2 w-full"
                    placeholder="Enter city..."
                    defaultValue={city}
                    onChangeText={city => setCity(city)}
                />
                <Button className="mt-2" variant="destructive" onPress={fetchWeatherDatas} disabled={isLoading}>
                    <Text>Submit</Text>
                </Button>
            </ThemedView>
            {
                weatherData && weatherData.weather.length > 0 && (
                    isLoading ? (
                            <View className="inline-flex flex-row items-center px-8 gap-2">
                                <LoaderCircleIcon color="black" className="animate-spin"/>
                                <ThemedText>Loading...</ThemedText>
                            </View>
                        ) :
                        <ThemedView>
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>{weatherData.name}</CardTitle>
                                    <CardDescription>
                                        {weatherData.weather[0].description}
                                    </CardDescription>
                                    <ThemedView className="flex flex-row gap-2">
                                        <ThemedView className="flex flex-row items-center gap-1">
                                            <ArrowDown size={20} color="blue"/>
                                            <Text className="text-blue-600">
                                                {weatherData.main.temp_min}°C
                                            </Text>
                                        </ThemedView>
                                        <ThemedView className="flex flex-row items-center gap-1">
                                            <ArrowUp size={20} color="red"/>
                                            <Text className="text-red-500">
                                                {weatherData.main.temp_max}°C
                                            </Text>
                                        </ThemedView>
                                    </ThemedView>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center">
                                    <Image
                                        source={iconMap[iconUrl!]}
                                        className="size-24"
                                    />
                                    <ThemedText type="title">{weatherData.main.temp}°C</ThemedText>
                                </CardContent>
                                <CardFooter className="flex flex-row justify-center gap-8">
                                    <ThemedView className="flex flex-row items-center gap-1 p-1">
                                        <Droplet size={20} color="black"/>
                                        <Text>
                                            {weatherData.main.humidity}%
                                        </Text>
                                    </ThemedView>
                                    <ThemedView className="flex flex-row items-center gap-1 p-1">
                                        <WindIcon size={20} color="black"/>
                                        <Text>
                                            {weatherData.wind.speed} km/h
                                        </Text>
                                    </ThemedView>
                                </CardFooter>
                            </Card>
                        </ThemedView>
                )
            }

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
