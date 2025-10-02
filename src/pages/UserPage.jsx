import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { Skeleton, SkeletonCard, SkeletonText } from "../components/Skeleton";
import { Image } from "../components/UI/Image";
import { ImageContainer } from "../components/UI/ImageContainer";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { normalizeId } from "../helpers/normalizeId";
import { useDevice } from "../hooks/useDevice";
import { useLoading } from "../hooks/useLoading";
import { AVATAR_DATA } from "../utils/AVATAR_DATA";

export const UserPage = () => {
    const [userProfile, setUserProfile] = useState({});
    const { user } = useContext(AuthContext);
    const { getProfile, patchUser, loadingUserMe } = useAuth();

    const loadingAvatar = useLoading();

    const { theme } = useContext(ThemeContext);
    const { isMobile, isTablet, isDesktop } = useDevice();

    const avatarClasses = classNames("rounded-full overflow-hidden", {
        "w-30": isMobile,
        "w-35": isTablet,
        "w-40": isDesktop,
    });
    const miniAvatarClasses = classNames("rounded-full overflow-hidden", {
        "w-16": isMobile,
        "w-22": isTablet,
        "w-24": isDesktop,
    });

    const handleGetMeUser = async () => {
        try {
            const fetchedUser = await getProfile();
            if (!fetchedUser) throw new Error("Not Fetched User");
            const fixedUserProfile = normalizeId(fetchedUser.user);
            if (!fixedUserProfile) throw new Error("Not posible to Normalize User Profile");

            setUserProfile(fixedUserProfile);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangeAvatar = async (avatarData) => {
        loadingAvatar.setIsLoading(true);
        try {
            const newData = { avatar: { url: avatarData.url, alt: avatarData.alt } };
            console.log("Que vale newData", newData);
            const updatedUser = await patchUser(newData);
            console.log("updatedUser", updatedUser);
        } catch (err) {
            console.error("Algo ha salido mal", err);
        } finally {
            loadingAvatar.setIsLoading(false);
            console.log("Que vale ahora userProfile", userProfile);
            console.log("que vale user", user);
        }
    };

    useEffect(() => {
        handleGetMeUser();
    }, [user]);

    if (loadingUserMe.isLoading)
        return (
            <div className="flex flex-1 flex-col py-6">
                <Container className="flex-1 gap-5">
                    <div className="flex flex-col gap-3">
                        <SkeletonCard showAvatar={false} textLines={1} />
                        <Skeleton
                            variant="custom"
                            className={classNames("self-center rounded-full bg-gray-300 ", {
                                "w-[100px] h-[100px]": isMobile,
                                "w-[140px] h-[140px]": isTablet,
                                "w-[160px] h-[160px]": isDesktop,
                            })}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <SkeletonText lines={2} size="xl" className="p-4 bg-white rounded-lg" />
                        <SkeletonText lines={2} size="xl" className="p-4 bg-white rounded-lg" />
                        <SkeletonText lines={2} size="xl" className="p-4 bg-white rounded-lg" />
                    </div>
                </Container>
            </div>
        );

    if (!userProfile) return null;
    return (
        <div className="flex flex-1 flex-col">
            <Container>
                <div>
                    <h1>PROFILE</h1>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <ImageContainer className={avatarClasses}>
                        <Image imgSrc={userProfile?.avatar?.url} alt={userProfile?.avatar?.alt} />
                    </ImageContainer>
                    <div>
                        <Dropdown placement="bottom-center" offset={40}>
                            <DropdownTrigger
                                hasIcon={false}
                                btnStyle={false}
                                className={"btn-outline px-3 py-1.5"}
                            >
                                Cambiar Avatar
                            </DropdownTrigger>
                            <DropdownMenu direction="flex-row" className="mt-1 px-3" gap="gap-2">
                                {AVATAR_DATA.map((avatar) => (
                                    <ImageContainer
                                        key={avatar.url}
                                        className={miniAvatarClasses}
                                        onClick={() => handleChangeAvatar(avatar)}
                                    >
                                        <Image imgSrc={avatar.url} alt={avatar.alt} />
                                    </ImageContainer>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </Container>
        </div>
    );
};
