<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1">
      <!-- Nút bên trái -->
      <div>
        <b-button
          variant="success"
          class="mr-1"
          @click="updateStatus('accept')"
        >
          <feather-icon icon="CheckIcon" />
          Chấp nhận
        </b-button>
        <b-button variant="danger" @click="updateStatus('reject')">
          <feather-icon icon="XIcon" />
          Từ chối
        </b-button>
      </div>

      <!-- Nút bên phải -->
      <div>
        <b-button
          variant="primary"
          @click="
            showModal = true;
            edit = false;
            id = null;
          "
        >
          <feather-icon icon="PlusIcon" />
          Thêm mới
        </b-button>
      </div>
    </div>

    <!-- Modal -->
    <b-modal
      id="add-item-modal"
      v-model="showModal"
      :title="edit ? 'Chỉnh sửa' : 'Thêm mới'"
      hide-footer
    >
      <UserCreateOrEdit
        :edit="edit"
        :id="id"
        @submitted="
          getData();
          showModal = false;
          edit = false;
        "
      />
    </b-modal>

    <!-- table -->
    <vue-good-table
      ref="refUserTable"
      :columns="columns"
      :rows="rows"
      :select-options="{
        enabled: true,
        selectionText: 'dòng được chọn',
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{ enabled: true, perPage: pageLength }"
    >
      <template slot="table-row" slot-scope="props">
        <!-- Column: Status -->
        <span v-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ userStatus[props.row.status] }}
          </b-badge>
        </span>
        <span v-else-if="props.column.field === 'role'">
          {{ userRole[props.row.role] }}
        </span>
        <!-- <span v-else-if="props.column.field === 'teamId'">
          {{ JSON.stringify(props.row.Team) }}
        </span> -->
        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item @click="showModalEdit(props.row.id)">
                <feather-icon icon="Edit2Icon" class="mr-50" />
                <span>Sửa</span>
              </b-dropdown-item>
              <b-dropdown-item @click="deleteItem(props.row.id)">
                <feather-icon icon="TrashIcon" class="mr-50" />
                <span>Xóa</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </span>
      </template>
      <!-- pagination -->
      <template slot="pagination-bottom" slot-scope="props">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap"> Showing 1 to </span>
            <b-form-select
              v-model="pageLength"
              :options="['10', '20', '50']"
              class="mx-1"
              @input="
                (value) => props.perPageChanged({ currentPerPage: value })
              "
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value) => props.pageChanged({ currentPage: value })"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import UserCreateOrEdit from "./user-create-or-edit.vue";

export default {
  components: {
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
    UserCreateOrEdit,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: "Họ tên",
          field: "name",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          headerClasses: "custom-header-name",
        },
        {
          label: "Số điện thoại",
          field: "phone",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Email",
          field: "email",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Quyền hệ thống",
          field: "role",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Trạng thái",
          field: "status",
          filterOptions: {
            enabled: true,
            placeholder: "Tất cả",
            filterDropdownItems: [
              { value: "accept", text: "Chấp nhận" },
              { value: "reject", text: "Từ chối" },
              { value: "pending", text: "Chờ duyệt" },
            ],
          },
        },
        {
          label: "",
          field: "action",
        },
      ],
      rows: [],
      showModal: false,
      edit: false,
      id: null,
      userRole: {
        ADMIN: "Quản trị viên",
        USER: "Người dùng",
      },
      userStatus: {
        accept: "Chấp nhận",
        reject: "Từ chối",
        pending: "Chờ duyệt",
      },
    };
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        accept: "light-success",
        reject: "light-danger",
        pending: "light-warning",
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      await this.$callApi.get("/api/users").then((res) => {
        if (this.userData.role === "LEADERBRANCH") {
          res.data.data = res.data.data.filter((item) => {
            return item.branchId == this.userData.branchId;
          });
        }
        this.rows = res.data.data.sort((a, b) => b.id - a.id);
        this.rows = res.data.data;
      });
    },
    showModalEdit(id) {
      this.id = id;
      this.edit = true;
      this.showModal = true;
    },
    async deleteItem(id) {
      await this.$callApi
        .delete("/api/users/" + id)
        .then(async () => {
          await this.getData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Xóa thành công`,
              icon: "CheckIcon",
              variant: "success",
            },
          });
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Lỗi`,
              icon: "AlertCircleIcon",
              variant: "danger",
              text: error,
            },
          });
        });
    },
    async updateStatus(status) {
      const selectedItems = this.$refs.refUserTable.selectedRows.map(
        (item) => item.id
      );
      if (!selectedItems.length) {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Không có mục nào được chọn!",
            icon: "AlertCircleIcon",
            variant: "danger",
          },
        });
        return;
      }

      try {
        const response = await this.$callApi.post(
          "/api/users/updateUserStatus",
          {
            ids: selectedItems,
            status,
          }
        );

        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Cập nhật thành công`,
            icon: "CheckIcon",
            variant: "success",
            text: `Đã cập nhật trạng thái: ${
              status === "accept" ? "Chấp nhận" : "Từ chối"
            }`,
          },
        });

        // Làm mới danh sách hoặc cập nhật trạng thái trong bảng
        this.getData();
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Cập nhật thất bại`,
            icon: "AlertCircleIcon",
            variant: "danger",
            text: error,
          },
        });
        console.error(
          "Error updating status:",
          error.response || error.message
        );
      }
    },
  },
};
</script>

<style lang="scss"></style>
