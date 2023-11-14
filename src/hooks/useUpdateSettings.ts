import { ElNotification } from "element-plus";
import { updateSettingApi } from "@/services/apis/admin";
import { userStore } from "@/stores/user";

const { token } = userStore();

export const useUpdateSettings = () => {
  const { state, isLoading, execute } = updateSettingApi();

  const updateSet = async (sets: Record<string, any>) => {
    try {
      await execute({
        headers: {
          Authorization: token.value
        },
        data: sets
      });
    } catch (err: any) {
      console.error(err.message);
      ElNotification({
        title: "错误",
        message: err.response.data.error || err.message,
        type: "error"
      });
    }
  };

  return {
    state,
    isLoading,
    updateSet
  };
};