import { defineStore } from 'pinia'

/*
 eg:
 <template>
    <div>{{ userStore.name }}</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
// 通过actions修改状态
userStore.updateName('lisi')
</script>

 */
export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            name: '张三'
        }
    },
    actions: {
        updateName(name: string) {
            this.name = name
        }
    }
})
