import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { TCommunityDetails, TCommunityLike } from "@/types";
import { communityLikedToggle, getCommunities, postCommunity } from "@/services/community.services";

export type CommunityFormInputs = {
    text: string;
    image?: FileList;
};

export const useCommunityLikedToggle = (communityId: string, likes: TCommunityLike[]) => {
    const user = useCurrentUser();

    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [noOfLikes, setNoOfLikes] = useState<number>(likes?.length || 0);

    useEffect(() => {
        setIsLiked(likes?.some((l) => l.ownerId === user?.id) || false);
    }, [likes, user]);

    const onLiked = async () => {
        try {
            const res = await communityLikedToggle(communityId);

            if (res.error) {
                setError(res.error);
                return;
            }

            setSuccess(res.message);
            if (res.success) {
                setIsLiked(!isLiked);
                setNoOfLikes(isLiked ? noOfLikes - 1 : noOfLikes + 1);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return {
        error,
        success,
        onLiked,
        isLiked,
        noOfLikes,
    };
};

export const useCommunityForm = (handleAddCommunity: (newCommunity: TCommunityDetails) => void) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>();
    const [submitSuccess, setSubmitSuccess] = useState<string>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CommunityFormInputs>({
        defaultValues: {
            text: "",
            image: undefined,
        },
    });

    const onSubmit: SubmitHandler<CommunityFormInputs> = async (data) => {
        setIsLoading(true);
        setSubmitError(undefined);
        setSubmitSuccess(undefined);

        try {
            const res = await postCommunity(data.text, data?.image?.[0]!);

            if (res.error) {
                setSubmitError(res.error);
                return;
            }

            setSubmitSuccess(res.message);
            handleAddCommunity(res.data);

            reset();
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            setSubmitError(error.message);
        }
    };

    return {
        isLoading,
        submitError,
        submitSuccess,
        register,
        handleSubmit,
        onSubmit,
    };
};

export const useGetAllCommunities = () => {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [communities, setCommunities] = useState<TCommunityDetails[]>([]);

    useEffect(() => {
        getCommunities()
            .then((res) => {
                if (res.error) {
                    setError(res.error);
                    return;
                }

                setCommunities(res.data);
                setSuccess(res.message);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    return {
        error,
        success,
        communities,
        setCommunities,
    };
};
