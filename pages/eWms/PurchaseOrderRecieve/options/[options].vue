<template>
  <div class="evolve-page" v-if="!hide">
    <PageHeaderBar
      :menuid="EvolveMenu_Id"
      :pageurl="pageURL"
      :optionheader="true"
      :mastercode="helpMasterCode"
      :keywordslist="keywords"
    />
    <client-only>
      <div id="sc-page-content" class="evolve-page-body">
        <div id="nav-mdi" class="uk-card">
          <div class="uk-card-body">
            <div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
              <div class="uk-overflow-auto">
                <div class="uk-grid" data-uk-grid>
                  <!------------------------------ HEAD LEVEL INPUT START ---------------------->
                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-3@m">
                        <div class="uk-grid" data-uk-grid>
                          <div class="uk-width-1-2@m">
                            <label
                              for="table lable"
                              class="evolve-input-lable"
                              :data-uk-tooltip="keywords.gate_entry_number.ttps"
                              >{{ keywords.gate_entry_number.val }}
                            </label>
                          </div>
                          <div class="uk-width-1-2@m">
                            <!-- <ScInput
														v-model="gateNo"
														mode="outline"
														:placeholder="keywords..val"
														:data-uk-tooltip="keywords.gate_entry_number.ttps"
														:disabled="isDisable"
														@blur="onChangeGateNo()"
													></ScInput> -->
                            <!-- <FieldSearch
                              :key="reloadInitgateNo"
                              v-model="gateNo"
                              :placeholder="keywords.gate_entry_number.val"
                              :searchobject="gateEntrySearchObj"
                              :readonly="false"
                              @rowClick="onChangeGateNo($event)"
                            /> -->
                            {{abcs}} - qwed
                            		<ScTextarea
                                  v-model="abcs"
                                  mode="outline"
                                  placeholder="Remarks"
                                  name="abcs"
                                  :rows="2"
                                ></ScTextarea>
                          </div>
                        </div>
                      </div>

                      <div class="uk-width-1-3@m">
                        <div class="uk-grid" data-uk-grid>
                          <div class="uk-width-1-2@m">
                            <label
                              for="table lable"
                              class="evolve-input-lable"
                              :data-uk-tooltip="keywords.invoice_number.ttps"
                              >{{ keywords.invoice_number.val }}
                            </label>
                          </div>
                          <div class="uk-width-1-2@m">
                            <ScInput
                              v-model="v$.invoiceNo.$model"
                              mode="outline"
                              :error-class="v$.invoiceNo.$error"
                              :validator="v$.invoiceNo"
                              :placeholder="keywords.invoice_number.val"
                              :data-uk-tooltip="keywords.invoice_number.ttps"
                              :disabled="isDisable || isViewOnly"
                              @blur="
                                enableAddPoLine();
                                onChangeInvNo();
                              "
                            ></ScInput>
                          </div>
                        </div>
                      </div>

                      <div class="uk-width-1-3@m">
                        <div class="uk-grid" data-uk-grid>
                          <div class="uk-width-1-2@m">
                            <label
                              for="table lable"
                              class="evolve-input-lable"
                              :data-uk-tooltip="keywords.invoice_date.ttps"
                              >{{ keywords.invoice_date.val }}
                            </label>
                          </div>
                          <div class="uk-width-1-2@m">
                            <ScInput
                              v-model="v$.invoiceDate.$model"
                              v-flatpickr="{
                                altInput: false,
                                dateFormat: 'd-m-Y',
                                allowInput: false,
                                maxDate: 'today',
                              }"
                              :error-class="v$.invoiceDate.$error"
                              :validator="v$.invoiceDate"
                              mode="outline"
                              :disabled="isDisable || isViewOnly"
                              :placeholder="keywords.invoice_date.val"
                              @blur="enableAddPoLine()"
                            ></ScInput>
                          </div>
                        </div>
                      </div>

                      <div class="uk-width-1-3@m">
                        <div class="uk-grid" data-uk-grid>
                          <div class="uk-width-1-2@m">
                            <label
                              for="table lable"
                              class="evolve-input-lable"
                              :data-uk-tooltip="keywords.gate_number.ttps"
                              >{{ keywords.gate_number.val }}
                            </label>
                          </div>
                          <div class="uk-width-1-2@m">
                            <FieldSearch
                              :key="reloadInit"
                              v-model="v$.gateId.$model"
                              :errorclass="v$.gateId.$error"
                              :placeholder="keywords.gate_number.val"
                              :searchobject="gateSearchObj"
                              @change="
                                enableAddPoLine();
                                onChangeGate($event);
                              "
                              @rowClick="
                                enableAddPoLine();
                                onChangeGate($event);
                              "
                            />
                          </div>
                        </div>
                      </div>

                      <div class="uk-width-1-3@m">
                        <div class="uk-grid" data-uk-grid>
                          <div class="uk-width-1-2@m">
                            <label
                              for="table lable"
                              class="evolve-input-lable"
                              :data-uk-tooltip="keywords.supplier.ttps"
                              >{{ keywords.supplier.val }}
                            </label>
                          </div>
                          <div class="uk-width-1-2@m">
                            <FieldSearch
                              :key="reloadInit"
                              v-model="v$.supplierId.$model"
                              :errorclass="v$.supplierId.$error"
                              :placeholder="keywords.supplier.val"
                              :searchobject="supplierSearchObj"
                              @change="
                                enableAddPoLine();
                                onChangeSupplier($event);
                                enableAddPoLineByItem();
                              "
                              @rowClick="
                                enableAddPoLine();
                                onRowClickeSupplier($event);
                                enableAddPoLineByItem();
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!------------------------------ HEAD LEVEL LINE START ---------------------->
                  <div class="uk-width-1-1@m">
                    <button
                      title="Add Po Line"
                      class="sc-button sc-button-primary sc-button-small uk-align-right"
                      :disabled="addIsDisable || isViewOnly"
                      @click="addPoLinedata()"
                    >
                      {{ keywords.add_po_line.val }}
                    </button>
                    <button
                      title="Add By Item"
                      class="sc-button sc-button-primary sc-button-small uk-align-right uk-margin-small-right"
                      :disabled="isButtonDisable || !invoiceDate || isViewOnly"
                      :data-uk-toggle="'target: #addByItem' + uniqId"
                    >
                      <p>{{ keywords.add_by_item.val }}</p>
                    </button>

                    <ul data-uk-tab class="uk-flex-middle uk-margin-remove">
                      <li class="uk-active">
                        <a href="javascript:void(0)">
                          {{ keywords.data.val }}
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          {{ keywords.history.val }}
                        </a>
                      </li>
                    </ul>

                    <ul class="uk-switcher">
                      <li class="uk-active">
                        <div class="uk-grid">
                          <div class="uk-width-1-1@m">
                            <div class="responsive-table" style="height: 235px">
                              <table class="uk-table uk-table-striped">
                                <thead>
                                  <tr>
                                    <th>{{ keywords.po_number.val }}</th>
                                    <th>{{ keywords.po_line.val }}</th>
                                    <th>{{ keywords.item_code.val }}</th>
                                    <th>{{ keywords.item_desc.val }}</th>
                                    <!-- <th>{{ keywords.item_type.val }}</th> -->
                                    <!-- <th>{{ keywords.uom.val }}</th> -->
                                    <th>
                                      {{ keywords.qty.val }}-{{
                                        keywords.uom.val
                                      }}
                                    </th>
                                    <th>
                                      {{ keywords.default_unit_cost.val }}
                                    </th>
                                    <th>{{ keywords.unit_cost.val }}</th>
                                    <th>{{ keywords.recieve_qty.val }}</th>
                                    <th>{{ keywords.remaining_qty.val }}</th>
                                    <th>{{ keywords.return_qty.val }}</th>
                                    <th>{{ keywords.total_price.val }}</th>
                                    <th>{{ keywords.invoice_qty.val }}</th>
                                    <th>{{ keywords.physical_Qty.val }}</th>
                                    <th>{{ keywords.need_date.val }}</th>
                                    <th style="width: 105px">
                                      {{ keywords.action.val }}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(data, index23) in poLineArr"
                                    :key="index23"
                                  >
                                    <td>
                                      {{ data.EvolvePO_Number }}
                                    </td>
                                    <td>
                                      {{ data.EvolvePODetails_Line }}
                                    </td>
                                    <td>{{ data.EvolveItem_Code }}</td>
                                    <td>{{ data.EvolveItem_Desc }}</td>
                                    <!-- <td>{{ data.EvolvePODetails_Type }}</td> -->
                                    <!-- <td>{{ data.EvolveUom_Uom }}</td> -->
                                    <td>
                                      {{ data.EvolvePODetails_Qty }}
                                      {{ data.EvolveUom_Uom }}
                                    </td>
                                    <td>{{ data.EvolvePODetails_UnitCost }}</td>
                                    <td style="width: 6%">
                                      <ScInput
                                        :key="unitCostKey"
                                        v-model="
                                          data.EvolvePODetails_EnteredUnitCost
                                        "
                                        type="number"
                                        mode="outline"
                                        :disabled="isViewOnly"
                                        @blur="onChangeUnitCost(index23)"
                                      ></ScInput>
                                    </td>

                                    <td>
                                      {{ data.EvolvePODetails_ReceiveQty }}
                                    </td>
                                    <td>
                                      {{
                                        isNaN(
                                          data.EvolvePODetails_Qty -
                                            data.EvolvePODetails_ReceiveQty
                                        )
                                          ? ""
                                          : data.EvolvePODetails_Qty -
                                            data.EvolvePODetails_ReceiveQty
                                      }}
                                    </td>
                                    <td>
                                      {{ data.EvolvePODetails_ReturnQty }}
                                    </td>
                                    <td>
                                      {{ data.EvolvePODetails_TotalPrice }}
                                    </td>
                                    <td>
                                      {{
                                        data.pickQty == undefined
                                          ? 0
                                          : data.pickQty
                                      }}
                                    </td>
                                    <td style="width: 6%">
                                      <ScInput
                                        :key="physicalQtyKey"
                                        v-model="data.physicalQty"
                                        mode="outline"
                                        :disabled="
                                          data.physicalQtyDisable || isViewOnly
                                        "
                                        @blur="onChangePhysicalQty(index23)"
                                      ></ScInput>
                                    </td>
                                    <td>
                                      {{
                                        data.EvolvePODetails_NeedDate ==
                                        "Invalid date"
                                          ? "-"
                                          : data.EvolvePODetails_NeedDate
                                      }}
                                    </td>
                                    <td>
                                      <button
                                        :key="poLineArrReInit"
                                        title="Receive"
                                        class="sc-button sc-button-primary sc-button-mini"
                                        :disabled="
                                          data.addEnable == true ? false : true
                                        "
                                        @click="onAddPoLineDetail(index23)"
                                      >
                                        <p>{{ keywords.receive.val }}</p>
                                      </button>
                                      <button
                                        title="Delete"
                                        class="sc-button sc-button-danger sc-button-mini"
                                        :disabled="isViewOnly"
                                        @click="onDeletePoLine(index23)"
                                      >
                                        <i class="mdi mdi-delete"></i>
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="uk-width-1-1@m">
                            <div class="uk-flex uk-flex-center">
                              <button
                                class="sc-button header-button-evolve"
                                type="button"
                                :data-uk-tooltip="keywords.save.ttps"
                                :disabled="isViewOnly"
                                @click="savePoTransportDetails()"
                              >
                                {{ keywords.save.val }}
                              </button>
                              <button
                                class="sc-button header-button-evolve sc-button-flat-danger"
                                type="button"
                                :data-uk-tooltip="keywords.cancel.ttps"
                                :disabled="isViewOnly"
                                @click="useStore()['removeOneTab'](pageURL)"
                              >
                                {{ keywords.cancel.val }}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="uk-width-1-1@m">
                          <div
                            class="uk-child-width-1-1@m uk-grid"
                            data-uk-grid
                          >
                            <div>
                              <div class="uk-overflow-auto">
                                <table
                                  :key="reInitHistoryArr"
                                  class="uk-table uk-table-striped"
                                >
                                  <thead>
                                    <tr>
                                      <th>{{ keywords.po_number.val }}</th>
                                      <th>{{ keywords.po_line.val }}</th>
                                      <th>{{ keywords.item_code.val }}</th>
                                      <th>{{ keywords.item_desc.val }}</th>
                                      <th>{{ keywords.location.val }}</th>
                                      <th>{{ keywords.lot_no.val }}</th>
                                      <th>{{ keywords.ref_no.val }}</th>
                                      <th>{{ keywords.comments.val }}</th>
                                      <th>{{ keywords.uom.val }}</th>
                                      <th>{{ keywords.qty.val }}</th>
                                      <th>{{ keywords.stock_qty.val }}</th>
                                      <th>{{ keywords.stock_uom.val }}</th>
                                      <th>{{ keywords.action.val }}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <client-only
                                      v-for="(data, index) in poLineArr"
                                      :key="index"
                                    >
                                      <tr
                                        v-for="(
                                          v, index1
                                        ) in data.EvolvePoRecieve_LineDetails"
                                        :key="index1"
                                      >
                                        <td>{{ data.EvolvePO_Number }}</td>
                                        <td>{{ data.EvolvePODetails_Line }}</td>
                                        <td>{{ data.EvolveItem_Code }}</td>
                                        <td>{{ data.EvolveItem_Desc }}</td>
                                        <td>{{ v.EvolveLocation_Code }}</td>
                                        <td>{{ v.EvolvePoRecieve_LotNo }}</td>
                                        <td>{{ v.EvolvePoRecieve_RefNo }}</td>
                                        <td>
                                          {{ v.EvolvePoRecieve_Comments }}
                                        </td>
                                        <td>{{ v.EvolvePoRecieve_UomCode }}</td>
                                        <td>{{ v.EvolvePoRecieve_Qty }}</td>
                                        <td>
                                          {{ v.EvolvePoRecieve_StockQty }}
                                        </td>
                                        <td>
                                          {{ v.EvolvePoRecieve_StockUomCode }}
                                        </td>
                                        <td>
                                          <!-- <button
																					title="Edit"
																					class="sc-button sc-button-primary sc-button-mini"
																					@click="onEditPoLineDetail(index,index1,true)"
																				>
																					<i class="mdi mdi-square-edit-outline"></i>
																				</button> -->
                                          <button
                                            title="Print"
                                            class="sc-button sc-button-primary sc-button-mini"
                                            @click="
                                              printSingleItem(index, index1)
                                            "
                                          >
                                            <i class="mdi mdi-printer"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    </client-only>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ADD BY ITEM START -->
        <div :id="'addByItem' + uniqId" class="uk-modal" data-uk-modal>
          <div class="uk-modal-dialog" style="width: 90%; height: 500px">
            <button
              class="uk-modal-close-default"
              type="button"
              data-uk-close
            ></button>

            <div class="uk-modal-body">
              <div class="uk-grid" data-uk-grid style="align-items: baseline">
                <div
                  class="uk-width-1-1@m uk-grid uk-grid-medium uk-flex-middle"
                  data-uk-grid
                >
                  <div class="uk-width-1-2@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.item.ttps"
                          >{{ keywords.item.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <FieldSearch
                          :key="reloadItem"
                          v-model="itemId"
                          :placeholder="keywords.item.val"
                          :searchobject="itemSearchObj"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="uk-width-1-2@m">
                    <button
                      class="sc-button"
                      type="button"
                      :disabled="isViewOnly"
                      @click="findPoByItem()"
                    >
                      Find
                    </button>
                  </div>
                </div>

                <div
                  class="responsive-table uk-width-1-1@m"
                  style="height: 300px"
                >
                  <table class="uk-table uk-table-striped">
                    <thead>
                      <tr>
                        <th>
                          <!-- <PrettyCheck 
													:key="reInitIsAllCheck"
													v-model="isAllSelected"
													class="p-switch"
													name="inv"
													:disabled="isViewOnly"
													@change="onSelectAllSo()"
												>
												</PrettyCheck> -->
                        </th>
                        <th>{{ keywords.po_number.val }}</th>
                        <th>{{ keywords.po_line_No.val }}</th>
                        <th>{{ keywords.item_code.val }}</th>
                        <th>{{ keywords.item_desc.val }}</th>
                        <th>{{ keywords.detail_qty.val }}</th>
                        <th>{{ keywords.receive_qty.val }}</th>
                        <th>{{ keywords.rem_qty.val }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tc, index23) in poItemList" :key="index23">
                        <td>
                          <!-- <PrettyCheck 
													v-model="tc.isSelected"
													class="p-switch"
													name="inv"
													:disabled="isViewOnly"
													@change="onSelectSinglePo()"
												>
												</PrettyCheck> -->
                        </td>
                        <td>{{ tc.EvolvePO_Number }}</td>
                        <td>{{ tc.EvolvePODetails.EvolvePODetails_Line }}</td>
                        <td>{{ tc.EvolvePODetails.EvolveItem_Code }}</td>
                        <td>{{ tc.EvolvePODetails.EvolveItem_Desc }}</td>
                        <td>{{ tc.EvolvePODetails.EvolvePODetails_Qty }}</td>
                        <td>
                          {{ tc.EvolvePODetails.EvolvePODetails_ReceiveQty }}
                        </td>
                        <td>
                          {{ tc.EvolvePODetails.EvolvePODetails_RemainingQty }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="uk-modal-footer uk-text-center">
              <button
                class="sc-button"
                type="button"
                :disabled="isViewOnly"
                @click="addPoLineByItem()"
              >
                {{ keywords.save.val }}
              </button>
              <button
                class="sc-button header-button-evolve sc-button-flat-danger uk-modal-close"
                type="button"
                :data-uk-tooltip="'Close'"
                :disabled="isViewOnly"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <!-- ADD BY ITEM END -->

        <!------------------------------------  PO-RECIEVE-LINE-MODAL START --------------------------------------->

        <div
          id="PO-RECIEVE-LINE-MODAL"
          class="uk-modal"
          data-uk-modal
          bg-close="false"
        >
          <div
            class="uk-modal-dialog uk-overflow-auto"
            style="width: 100%; height: 700px"
          >
            <button
              class="uk-modal-close-default"
              type="button"
              data-uk-close
            ></button>
            <div class="uk-modal-header">
              <div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
                <span>{{ keywords.po_receive_detail_form.val }}</span>
              </div>
            </div>
            <div class="uk-modal-body">
              <div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.item_code.ttps"
                        >{{ keywords.item_code.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="item"
                        mode="outline"
                        disabled
                        :placeholder="keywords.item_code.val"
                        :data-uk-tooltip="keywords.item_code.ttps"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.device.ttps"
                        >{{ keywords.device.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <Select2
                        v-model="device"
                        :disabled="isViewOnly"
                        :settings="{
                          width: '100%',
                          placeholder: 'SELECT',
                          allowClear: true,
                        }"
                        @change="onChangeDevice($event)"
                      >
                        <option
                          v-for="row in deviceList"
                          :key="row.EvolveDevice_MacID"
                          :value="row.EvolveDevice_MacID"
                        >
                          {{ row.EvolveDevice_Name }}
                        </option>
                      </Select2>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.location.ttps"
                        >{{ keywords.location.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <FieldSearch
                        :key="reloadInitLocation"
                        v-model="v$.locationId.$model"
                        :errorclass="v$.locationId.$error"
                        :placeholder="keywords.location.val"
                        :searchobject="locationSearchObj"
                        @rowClick="onChangeLocation($event)"
                        @change="onChangeLocation($event)"
                      />
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.comments.ttps"
                        >{{ keywords.comments.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="v$.comments.$model"
                        mode="outline"
                        :error-class="v$.comments.$error"
                        :validator="v$.comments"
                        :placeholder="keywords.comments.val"
                        :data-uk-tooltip="keywords.comments.ttps"
                        :disabled="isViewOnly"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.lot_no.ttps"
                        >{{ keywords.lot_no.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="v$.lotNo.$model"
                        mode="outline"
                        max-length="18"
                        :error-class="lotNoRequired || v$.lotNo.$error"
                        :validator="v$.lotNo"
                        :disabled="lotNoDisable || isViewOnly"
                        :placeholder="keywords.lot_no.val"
                        :data-uk-tooltip="keywords.lot_no.ttps"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.ref_no.ttps"
                        >{{ keywords.ref_no.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="v$.refNo.$model"
                        mode="outline"
                        :error-class="refNoRequired || v$.refNo.$error"
                        :disabled="refNoDisable || isViewOnly"
                        :validator="v$.refNo"
                        :placeholder="keywords.ref_no.val"
                        max-length="8"
                        :data-uk-tooltip="keywords.ref_no.ttps"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.convert_rate.ttps"
                        >{{ keywords.convert_rate.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="itemUomConvRate"
                        mode="outline"
                        :disabled="isItemConvRateDisable || isViewOnly"
                        :placeholder="keywords.convert_rate.val"
                        :data-uk-tooltip="keywords.convert_rate.ttps"
                        @blur="onBlurItemUomConvRate"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.qty.ttps"
                        >{{ keywords.qty.val }}</label
                      >
                    </div>
                    <div class="uk-width-1-6@m">
                      <ScInput
                        v-model="v$.qty.$model"
                        mode="outline"
                        type="number"
                        :error-class="v$.qty.$error"
                        :validator="v$.qty"
                        :placeholder="keywords.qty.val"
                        :data-uk-tooltip="keywords.qty.ttps"
                        :disabled="qtyDisable || isViewOnly"
                        @input="onChangeQty"
                      ></ScInput>
                    </div>
                    <div class="uk-width-1-6@m">
                      <button
                        class="sc-button sc-button-info sc-button-mini"
                        :disabled="qtyDisable || isViewOnly"
                        @click="onCaptureWeight()"
                      >
                        <i class="mdi mdi-weight"></i>
                      </button>
                    </div>
                    <div class="uk-width-1-6@m">
                      <!-- <PrettyCheck v-model="isAddQty" name="isAddQty" class="p-switch" :disabled="isViewOnly">
											
										</PrettyCheck> -->
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.stock_qty.ttps"
                        >{{ keywords.stock_qty.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="stockQty"
                        mode="outline"
                        :error-class="v$.stockQty.$error"
                        :validator="v$.stockQty"
                        :disabled="true"
                        :placeholder="keywords.stock_qty.val"
                        :data-uk-tooltip="keywords.stock_qty.ttps"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.uom.ttps"
                        >{{ keywords.uom.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <FieldSearch
                        :key="reinitUom"
                        v-model="v$.uom.$model"
                        :errorclass="v$.uom.$error"
                        :placeholder="keywords.uom.val"
                        :searchobject="uomSearchObj"
                        @rowClick="onChangeUom($event)"
                        @change="onChangeUom($event)"
                      />
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.stock_uom.ttps"
                        >{{ keywords.stock_uom.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <FieldSearch
                        :key="reinitUom"
                        v-model="v$.stockUom.$model"
                        :errorclass="v$.stockUom.$error"
                        :placeholder="keywords.stock_uom.val"
                        :searchobject="stockUomSearchObj"
                        @rowClick="onRowClickStockUom($event)"
                        @change="onRowClickStockUom($event)"
                      />
                    </div>
                  </div>
                </div>

                <!-- <div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="keywords.tare_weight.ttps">{{ keywords.tare_weight.val }} </label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="tareWeight"
											mode="outline"
											type="number"
											:placeholder="keywords.tare_weight.val"
											:data-uk-tooltip="keywords.tare_weight.ttps"
											@blur="onChangeTareWeight()"
										></ScInput>
									</div>
								</div>
							</div> -->

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.supplier_lot_no.ttps"
                        >{{ keywords.supplier_lot_no.val }}
                      </label>
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="supplierLotNo"
                        mode="outline"
                        max-length="18"
                        :disabled="isViewOnly"
                        :placeholder="keywords.supplier_lot_no.val"
                        :data-uk-tooltip="keywords.supplier_lot_no.ttps"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.no_of_pallet.ttps"
                        >{{ keywords.no_of_pallet.val }}</label
                      >
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="v$.noOfPallet.$model"
                        :error-class="v$.noOfPallet.$error"
                        mode="outline"
                        type="number"
                        :disabled="
                          lotSerialNo == undefined ||
                          lotSerialNo.toLowerCase() == 'l' ||
                          lotSerialNo.toLowerCase() == ''
                            ? true
                            : false || isViewOnly
                        "
                        :placeholder="keywords.no_of_pallet.val"
                        :data-uk-tooltip="keywords.no_of_pallet.ttps"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.remaining_qty.ttps"
                        >{{ keywords.remaining_qty.val }}</label
                      >
                    </div>
                    <div class="uk-width-1-2@m">
                      <ScInput
                        v-model="remainQty"
                        mode="outline"
                        type="number"
                        disabled
                        :placeholder="keywords.remaining_qty.val"
                        :data-uk-tooltip="keywords.remaining_qty.ttps"
                      ></ScInput>
                    </div>
                  </div>
                </div>

                <client-only
                  v-if="
                    poLineArr.length > 0
                      ? poLineArr[currentPoLineIndex] != undefined
                        ? poLineArr[currentPoLineIndex].childAttributesList !=
                          undefined
                          ? true
                          : false
                        : false
                      : false
                  "
                >
                  <div
                    v-for="(ha, index21) in poLineArr[currentPoLineIndex]
                      .childAttributesList"
                    :key="index21"
                    class="uk-width-1-2@m"
                  >
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="ha.EvolveAttributes_Lable"
                          >{{ ha.EvolveAttributes_Lable }} :
                        </label>
                      </div>
                      <div
                        v-if="ha.EvolveAttributes_InputType == 'Input'"
                        class="uk-width-1-2@m"
                      >
                        <ScInput
                          v-model="ha.EvolveAttributes_Value"
                          :disabled="isViewOnly"
                          mode="outline"
                        ></ScInput>
                      </div>

                      <div
                        v-if="ha.EvolveAttributes_InputType == 'Select'"
                        class="uk-width-1-2@m"
                      >
                        <Select2
                          v-model="ha.EvolveAttributes_Value"
                          :disabled="isViewOnly"
                          :settings="{
                            width: '100%',
                            placeholder: 'SELECT',
                            allowClear: true,
                          }"
                        >
                          <option key value>SELECT</option>
                          <option
                            v-for="row in ha.SelectToArray"
                            :key="row.value"
                            :value="row.value"
                          >
                            {{ row.key }}
                          </option>
                        </Select2>
                      </div>
                      <div
                        v-if="ha.EvolveAttributes_InputType == 'MasterLink'"
                        class="uk-width-1-2@m"
                      >
                        <FieldSearch
                          :key="tempreInit"
                          v-model="ha.EvolveAttributes_Value"
                          :searchobject="ha.serarchObj"
                        />
                      </div>
                      <div
                        v-if="
                          ha.EvolveAttributes_InputType == 'CheckBox' ||
                          ha.EvolveAttributes_InputType == 'Radio'
                        "
                      >
                        <div
                          v-for="(val, index) in ha.SelectToArray"
                          :key="index"
                          class="uk-grid"
                          data-uk-grid
                        >
                          <div
                            v-if="ha.EvolveAttributes_InputType == 'Radio'"
                            class="uk-width-1-2@m"
                          >
                            <input
                              v-model="ha.EvolveAttributes_Value"
                              type="radio"
                              :name="val.key"
                              :value="val.value"
                              :disabled="isViewOnly"
                              class="uk-radio"
                              style="margin-right: 30px"
                            />
                          </div>
                          <div v-else class="uk-width-1-2@m">
                            <input
                              v-model="val.isEnable"
                              type="checkbox"
                              :value="val.value"
                              class="p-icon"
                              :disabled="isViewOnly"
                              @change="onChageParentCheckBox(index21)"
                            />
                          </div>
                          <div class="uk-width-1-2@m">
                            <label for="table lable" :data-uk-tooltip="val.key"
                              >{{ val.key }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </client-only>
              </div>
            </div>
            <div class="uk-modal-footer uk-text-center">
              <button
                class="sc-button"
                type="button"
                :disabled="isViewOnly"
                @click="savePoRecieveLine()"
              >
                {{ keywords.save.val }}
              </button>
            </div>

            <div class="uk-overflow-auto" style="height: 150px">
              <table
                :key="reinitRecieveTable"
                class="uk-table uk-table-striped"
              >
                <thead>
                  <tr>
                    <th>{{ keywords.location.val }}</th>
                    <th>{{ keywords.lot_no.val }}</th>
                    <th>{{ keywords.ref_no.val }}</th>
                    <th>{{ keywords.comments.val }}</th>
                    <th>{{ keywords.uom.val }}</th>
                    <th>{{ keywords.qty.val }}</th>
                    <th>{{ keywords.stock_qty.val }}</th>
                    <th>{{ keywords.stock_uom.val }}</th>
                    <th>{{ keywords.action.val }}</th>
                  </tr>
                </thead>
                <tbody>
                  <client-only
                    v-if="
                      poLineArr.length > 0
                        ? poLineArr[currentPoLineIndex] != undefined
                          ? poLineArr[currentPoLineIndex]
                              .EvolvePoRecieve_LineDetails != undefined
                            ? true
                            : false
                          : false
                        : false
                    "
                  >
                    <tr
                      v-for="(tc, index2) in poLineArr[currentPoLineIndex]
                        .EvolvePoRecieve_LineDetails"
                      :key="index2"
                    >
                      <td>{{ tc.EvolveLocation_Code }}</td>
                      <td>{{ tc.EvolvePoRecieve_LotNo }}</td>
                      <td>{{ tc.EvolvePoRecieve_RefNo }}</td>
                      <td>{{ tc.EvolvePoRecieve_Comments }}</td>
                      <td>{{ tc.EvolvePoRecieve_UomCode }}</td>
                      <td>{{ tc.EvolvePoRecieve_Qty }}</td>
                      <td>{{ tc.EvolvePoRecieve_StockQty }}</td>
                      <td>{{ tc.EvolvePoRecieve_StockUomCode }}</td>
                      <td>
                        <!-- <button
												:data-uk-tooltip="keywords.edit.ttps"
												class="sc-button sc-button-primary sc-button-mini"
												@click="onEditPoLineDetail(currentPoLineIndex,index2,false)"
											>
												<i class="mdi mdi-square-edit-outline"></i>
											</button> -->
                        <button
                          :data-uk-tooltip="keywords.delete.ttps"
                          class="sc-button sc-button-danger sc-button-mini"
                          :disabled="isViewOnly"
                          @click="
                            onDeletePoLineDetail(currentPoLineIndex, index2)
                          "
                        >
                          <i class="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                  </client-only>
                </tbody>
              </table>
            </div>

            <div class="uk-flex uk-flex-center">
              <button
                class="sc-button sc-button-primary header-button-evolve"
                type="button"
                :disabled="isViewOnly"
                :data-uk-tooltip="keywords.save.ttps"
                @click="printDetails(currentPoLineIndex)"
              >
                {{ keywords.print.val }}
              </button>
            </div>
          </div>
        </div>

        <!---------------------------------------------  TRANSPORT MODAL START --------------------------------------------->

        <div id="TRANSPORT_MODAL_PORECEIVE" class="uk-modal" data-uk-modal>
          <div class="uk-modal-dialog" style="width: 70%">
            <button
              class="uk-modal-close-default"
              type="button"
              data-uk-close
            ></button>

            <div class="uk-modal-body">
              <div class="uk-grid" data-uk-grid style="align-items: baseline">
                <div class="uk-width-1-2@m uk-grid" data-uk-grid>
                  <div
                    class="uk-width-1-1@m uk-text-center"
                    style="background: whitesmoke"
                  >
                    {{ keywords.transport_detail.val }}
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.ship_date.ttps"
                          >{{ keywords.ship_date.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="shipDate"
                          v-flatpickr="{
                            altInput: false,
                            dateFormat: 'd-m-Y',
                            allowInput: false,
                            maxDate: 'today',
                          }"
                          mode="outline"
                          name="needDate"
                          :error-class="shipDateRequied"
                          :placeholder="keywords.ship_date.val"
                          :disabled="isViewOnly"
                        ></ScInput>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.ship_via.ttps"
                          >{{ keywords.ship_via.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        {{ shipVia }}
                        <Select2
                          v-model="shipVia"
                          :disabled="isViewOnly"
                          :settings="{
                            width: '100%',
                            placeholder: keywords.ship_via.val,
                            allowClear: true,
                          }"
                        >
                          <option key value>
                            {{ keywords.ship_via.val }}
                          </option>
                          <option
                            v-for="(row, index2q) in shipViaDetail"
                            :key="index2q"
                            :value="row.EvolveGenCode_Value"
                          >
                            {{ row.EvolveGenCode_Value }} -
                            {{ row.EvolveGenCode_Desc }}
                          </option>
                        </Select2>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.fob.ttps"
                          >{{ keywords.fob.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="fob"
                          mode="outline"
                          :disabled="isViewOnly"
                          :placeholder="keywords.fob.val"
                          :data-uk-tooltip="keywords.fob.ttps"
                        ></ScInput>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.trans_mode.ttps"
                          >{{ keywords.trans_mode.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="transMode"
                          mode="outline"
                          :disabled="isViewOnly"
                          :placeholder="keywords.trans_mode.val"
                          :data-uk-tooltip="keywords.trans_mode.ttps"
                        ></ScInput>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.vehicle_ref.ttps"
                          >{{ keywords.vehicle_ref.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="vehicleRef"
                          mode="outline"
                          :disabled="isViewOnly"
                          :placeholder="keywords.vehicle_ref.val"
                          :data-uk-tooltip="keywords.vehicle_ref.ttps"
                        ></ScInput>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.voyage.ttps"
                          >{{ keywords.voyage.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="voyage"
                          mode="outline"
                          :disabled="isViewOnly"
                          :placeholder="keywords.voyage.val"
                          :data-uk-tooltip="keywords.voyage.ttps"
                        ></ScInput>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.origin.ttps"
                          >{{ keywords.origin.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="origin"
                          mode="outline"
                          :disabled="isViewOnly"
                          :placeholder="keywords.origin.val"
                          :data-uk-tooltip="keywords.origin.ttps"
                        ></ScInput>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.port_depart.ttps"
                          >{{ keywords.port_depart.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="portDepart"
                          mode="outline"
                          :disabled="isViewOnly"
                          :placeholder="keywords.port_depart.val"
                          :data-uk-tooltip="keywords.port_depart.ttps"
                        ></ScInput>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.port_arrive.ttps"
                          >{{ keywords.port_arrive.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="portArrive"
                          mode="outline"
                          :disabled="isViewOnly"
                          :placeholder="keywords.port_arrive.val"
                          :data-uk-tooltip="keywords.port_arrive.ttps"
                        ></ScInput>
                      </div>
                    </div>
                  </div>

                  <div class="uk-width-1-1@m">
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="keywords.remarks.ttps"
                          >{{ keywords.remarks.val }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="remarks"
                          mode="outline"
                          :disabled="isViewOnly"
                          :placeholder="keywords.remarks.val"
                          :data-uk-tooltip="keywords.remarks.ttps"
                        ></ScInput>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="isTaxDetail"
                  class="uk-width-1-2@m uk-grid"
                  data-uk-grid
                >
                  <div
                    class="uk-width-1-1@m uk-text-center"
                    style="background: whitesmoke"
                  >
                    {{ keywords.tax_detail.val }}
                  </div>

                  <div
                    v-for="(data, index) in taxDetailArr"
                    :key="index"
                    class="uk-width-1-1@m"
                  >
                    <div class="uk-grid" data-uk-grid>
                      <div class="uk-width-1-2@m">
                        <label
                          for="table lable"
                          class="evolve-input-lable"
                          :data-uk-tooltip="data.key"
                          >{{ data.key }}
                        </label>
                      </div>
                      <div class="uk-width-1-2@m">
                        <ScInput
                          v-model="data.enteredValue"
                          mode="outline"
                          :placeholder="data.key"
                          :data-uk-tooltip="data.key"
                          :disabled="data.isDisabled || isViewOnly"
                        ></ScInput>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="uk-modal-footer uk-text-center">
              <button
                class="sc-button"
                type="button"
                :disabled="isViewOnly"
                @click="createPorecieve()"
              >
                {{ keywords.save.val }}
              </button>
              <button
                class="sc-button header-button-evolve sc-button-flat-danger uk-modal-close"
                type="button"
                :disabled="isViewOnly"
                :data-uk-tooltip="keywords.cancel.ttps"
              >
                {{ keywords.cancel.val }}
              </button>
            </div>
          </div>
        </div>
        <div id="PRINTDETAILS" class="uk-modal" data-uk-modal>
          <div class="uk-modal-dialog">
            <button
              class="uk-modal-close-default"
              type="button"
              data-uk-close
            ></button>
            <div class="uk-modal-header">
              <h2 class="uk-modal-title">
                {{ keywords.print_details.val }}
              </h2>
            </div>
            <div class="uk-modal-body">
              <div class="uk-width-1-1@m">
                <div class="uk-grid" data-uk-grid>
                  <div class="uk-width-1-4@m">
                    <label
                      for="table lable"
                      class="evolve-input-lable"
                      :data-uk-tooltip="keywords.printNo.ttps"
                      >{{ keywords.printNo.val }} :
                    </label>
                  </div>
                  <div class="uk-width-1-2@m">
                    <ScInput
                      v-model="printNum"
                      mode="outline"
                      name="printNum"
                      type="number"
                      :placeholder="keywords.printNo.val"
                    ></ScInput>
                  </div>
                </div>
              </div>
            </div>
            <div class="uk-modal-footer uk-text-right">
              <button
                :data-uk-tooltip="keywords.cancel.ttps"
                class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
                type="button"
              >
                {{ keywords.cancel.val }}
              </button>
              <button
                :data-uk-tooltip="keywords.save.ttps"
                class="sc-button"
                type="button"
                @click="printAllLabel(poLineIndex)"
              >
                {{ keywords.save.val }}
              </button>
            </div>
          </div>
        </div>
        <!--  --------------------------------------------- Add PO Line ---------------------------------------------- -->
        <div
          :id="'Add-Po-Line' + uniqId"
          class="uk-modal"
          data-uk-modal
          bg-close="false"
        >
          <div class="uk-modal-dialog" style="width: 800px">
            <div class="sc-padding">
              <button
                class="uk-modal-close-default"
                type="button"
                data-uk-close
                @click="resetAddlineDetails()"
              ></button>
              <div
                class="uk-child-width-1-1@m uk-grid uk-margin-large-right"
                data-uk-grid
              >
                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.po_number.ttps"
                        >{{ keywords.po_number.val }}</label
                      >
                    </div>

                    <div class="uk-width-1-2@m">
                      <FieldSearch
                        :key="reloadInit1"
                        v-model="poID"
                        :placeholder="keywords.poNumber.val"
                        :searchobject="poSearchObj"
                        @rowClick="onRawClickPo($event)"
                      />
                    </div>
                  </div>
                </div>
                <div class="uk-width-1-2@m">
                  <div class="uk-grid" data-uk-grid>
                    <div class="uk-width-1-2@m">
                      <label
                        for="table lable"
                        class="evolve-input-lable"
                        :data-uk-tooltip="keywords.po_line.ttps"
                        >{{ keywords.po_line.val }}</label
                      >
                    </div>

                    <div class="uk-width-1-2@m">
                      <FieldLineSearch
                        :key="reinit"
                        v-model="PODetailsID"
                        :searchobject="poLineSearchObj"
                        :placeholder="keywords.po_line.val"
                        @rowClick="onRawClickPoLine($event)"
                      />
                      <!-- </client-only> -->
                    </div>
                  </div>
                </div>
                <div class="uk-modal-footer uk-text-center">
                  <button
                    :data-uk-tooltip="keywords.cancel.ttps"
                    class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
                    type="button"
                    @click="resetAddlineDetails()"
                  >
                    {{ keywords.cancel.val }}
                  </button>
                  <button
                    :data-uk-tooltip="keywords.save.ttps"
                    :disabled="isPolinecall"
                    class="sc-button"
                    type="button"
                    @click="addPoLine(true)"
                  >
                    {{ keywords.save.val }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { scHelpers } from "~/assets/js/utils";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  requiredIf,
  minValue,
  maxLength,
} from "@vuelidate/validators";
const { uniqueID } = scHelpers;
import "~/plugins/flatpickr";

export default {
  head() {
    return {
      title: "Evolve - " + this.$route.name,
    };
  },
  layout: "eDefaultV2",
  components: {
    Select2: process.client
      ? defineAsyncComponent(() => import("~/components/Select2"))
      : null,
    FieldSearch: process.client
      ? defineAsyncComponent(() => import("~/components/cust/FieldSearch"))
      : null,
    FieldLineSearch: process.client
      ? defineAsyncComponent(() => import("~/components/cust/FieldLineSearch"))
      : null,
    PrettyCheck: process.client
      ? defineAsyncComponent(() => import("pretty-checkbox-vue/check"))
      : null,
    ScInput: process.client
      ? defineAsyncComponent(() => import("~/components/Input"))
      : null,
    PageHeaderBar: process.client
      ? defineAsyncComponent(() => import("~/components/cust/PageHeaderBar"))
      : null,
    ScTextarea: process.client
      ? defineAsyncComponent(() => import("~/components/Textarea"))
      : null,
  },
  // setup() {
  //   return { v$: useVuelidate()};
  // },


  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      v$:null,
      EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
      userId: useStore().user.EvolveUser_ID,
      unitId: useStore().user.EvolveUnit_ID,
      grnOverPrice: useStore().user.EvolvePageConfig
        ? useStore().user.EvolvePageConfig.GRNONOVERPRICE
          ? useStore().user.EvolvePageConfig.GRNONOVERPRICE == "true"
            ? true
            : false
          : false
        : false,
      token: useStore().user.EvolveToken,
      baseURL: this.$config.public.baseURL,
      pageURL: "/eWms/PurchaseOrderRecieve/options/",
	  hide: false,

      helpMasterCode: "EvolvePoRecieveOptions",
      isPoLineDuedate: useStore().user.EvolvePageConfig
        ? useStore().user.EvolvePageConfig.ISPOLINEDUEDATECHECK
          ? useStore().user.EvolvePageConfig.ISPOLINEDUEDATECHECK == "true"
            ? true
            : false
          : false
        : false,
      keywords: {
        device: {
          val: "Select Device",
          ttps: "",
        },
        poNumber: {
          val: "Po Number",
          ttps: "",
        },
        gate_number: {
          val: "Gate Number",
          ttps: "",
        },
        invoice_number: {
          val: "Invoice Number",
          ttps: "",
        },
        invoice_date: {
          val: "Invoice Date",
          ttps: "",
        },
        gate_entry_number: {
          val: "Gate Entry Numbr",
          ttps: "",
        },
        supplier: {
          val: "Supplier",
          ttps: "",
        },
        po_number: {
          val: "Po Number",
          ttps: "",
        },
        po_line: {
          val: "Po Line",
          ttps: "Po Line",
        },

        item_code: {
          val: "Item Code",
          ttps: "",
        },
        item_desc: {
          val: "Item Desc",
          ttps: "",
        },
        item_type: {
          val: "Item Type",
          ttps: "",
        },
        unit_cost: {
          val: "Unit Cost",
          ttps: "",
        },
        default_unit_cost: {
          val: "D. Cost",
          ttps: "",
        },
        recieve_qty: {
          val: "Rcvd.Qty",
          ttps: "",
        },
        qty: {
          val: "Qty",
          ttps: "",
        },
        remaining_qty: {
          val: "Rem. Qty",
          ttps: "",
        },
        return_qty: {
          val: "Return Qty",
          ttps: "",
        },
        total_price: {
          val: "Total Price",
          ttps: "",
        },
        pick_qty: {
          val: "Pick Qty",
          ttps: "",
        },
        need_date: {
          val: "Need Date",
          ttps: "",
        },

        show_data: {
          val: "Show Data",
          ttps: "",
        },
        data: {
          val: "DATA",
          ttps: "",
        },
        history: {
          val: "HISTORY",
          ttps: "",
        },
        unit: {
          val: "Unit",
          ttps: "",
        },
        location: {
          val: "Location",
          ttps: "",
        },
        lot_no: {
          val: "Lot Number",
          ttps: "",
        },
        supplier_lot_no: {
          val: "Supplier Lot No",
          ttps: "",
        },
        ref_no: {
          val: "Ref No",
          ttps: "",
        },
        comments: {
          val: "Comments",
          ttps: "",
        },
        qty: {
          val: "Qty",
          ttps: "",
        },
        tare_weight: {
          val: "Tare Weight",
          ttps: "",
        },
        stock_qty: {
          val: "Stock Qty",
          ttps: "",
        },
        uom: {
          val: "Uom",
          ttps: "",
        },
        stock_uom: {
          val: "Stock Uom",
          ttps: "",
        },
        transport_detail: {
          val: "TRANSPORT DETAILS",
          ttps: "",
        },
        ship_date: {
          val: "Ship Date",
          ttps: "",
        },
        ship_via: {
          val: "Po Ship Via",
          ttps: "",
        },
        fob: {
          val: "FOB",
          ttps: "",
        },
        trans_mode: {
          val: "Trans Mode",
          ttps: "",
        },
        vehicle_ref: {
          val: "Vehicle Ref",
          ttps: "",
        },
        voyage: {
          val: "Voyage",
          ttps: "",
        },
        origin: {
          val: "Origin",
          ttps: "",
        },
        port_depart: {
          val: "Port Depart",
          ttps: "",
        },
        port_arrive: {
          val: "Port Arrive",
          ttps: "",
        },
        remarks: {
          val: "Remarks",
          ttps: "",
        },
        tax_detail: {
          val: "TAX DETAILS",
          ttps: "",
        },
        frt: {
          val: "FRT",
          ttps: "",
        },
        ins: {
          val: "INS",
          ttps: "",
        },
        oth: {
          val: "OTH",
          ttps: "",
        },
        print: {
          val: "Print All Label",
          ttps: "",
        },
        edit: {
          val: "Edit",
          ttps: "",
        },
        save: {
          val: "Save",
          ttps: "",
        },
        delete: {
          val: "Delete",
          ttps: "",
        },
        cancel: {
          val: "Cancel",
          ttps: "",
        },
        action: {
          val: "Action",
          ttps: "",
        },
        add_po_line: {
          val: "Add Po Line",
          ttps: "",
        },
        receive: {
          val: "Receive",
          ttps: "",
        },
        po_receive_detail_form: {
          val: "PO Receive Detail Form",
          ttps: "",
        },
        no_of_pallet: {
          val: "No Of Pallet",
          ttps: "",
        },
        print_details: {
          val: "No Of Copy",
          ttps: "",
        },
        printNo: {
          val: "Print Copy",
          ttps: "",
        },
        convert_rate: {
          val: "Conv. Rate",
          ttps: "",
        },
        add_by_item: {
          val: "Add By Item",
          ttps: "",
        },
        item: {
          val: "Item",
          ttps: "",
        },
        po_number: {
          val: "Po Number",
          ttps: "",
        },
        po_line_No: {
          val: "Po Line Number",
          ttps: "",
        },
        detail_qty: {
          val: "Qty",
          ttps: "",
        },
        receive_qty: {
          val: "Receive Qty",
          ttps: "",
        },
        rem_qty: {
          val: "Rem Qty",
          ttps: "",
        },
        physical_Qty: {
          val: "Physical Qty",
          ttps: "Physical Qty",
        },
        invoice_qty: {
          val: "Invoice Qty",
          ttps: "Invoice Qty",
        },
      },
      shipViaDetail: [],
      deviceList: [],
      device: "",
      prevDevice: "",
      printerLabel: "",
      printerData: "",
      gateNo: "",
      invoiceNo: "",
      invoiceDate: "",
      poTaxEnv: "",
      poRecieveId: this.$route.query.primaryId,
      isViewOnly:
        this.$route.query.detailMode == undefined
          ? false
          : this.$route.query.detailMode == "true"
          ? true
          : false,
      uniqId: uniqueID(),
      lotNoRequired: false,
      refNoRequired: false,
      refNoDisable: false,
      lotNoDisable: false,
      isEditMode: false,
      shipDateRequied: false,
      locationIdR: true,
      commentsR: false,
      stockUomR: true,
      uomR: true,
      isDisable: false,
      stockQtyR: false,
      isPolinecall: true,
      poLineArrReInit: 0,
      reloadInitgateNo: 0,
      reloadInit: 0,
      reloadInit1: 0,
      reinit: 0,
      reloadInit2: [],
      reloadInitLocation: 0,
      reInitHistoryArr: 0,
      reinitRecieveTable: 0,
      reinitUom: 0,
      tempreInit: 0,
      printNum: 1,
      gateId: "",
      supplierId: null,
      poLineId: "",
      poLineArr: [],
      supplierCode: "",
      supplierName: "",
      gateEntryNumber: "",
      isGrnGenerated: false,

      unitCode: "",
      uomCode: "",
      locationId: "",
      locationCode: "",
      lotNo: "",
      refNo: "",
      comments: "",
      qty: 0,
      qtyDisable: false,
      isAddQty: false,
      tareWeight: 0,
      uom: "",
      stockQty: 0,
      stockUom: "",
      currentPoLineIndex: "",
      currentPoLineDetailsIndex: "",
      lotSerialNo: "",
      stockUomCode: "",
      lotNoSerialCode: "",
      supplierLotNo: "",
      poLineType: null,

      addIsDisable: true,

      shipDate: "",
      shipVia: "",
      fob: "",
      transMode: "",
      vehicleRef: "",
      voyage: "",
      origin: "",
      portDepart: "",
      portArrive: "",
      remarks: "",
      abcs:"",
      isButtonDisable: true,
      dd: false,
      isTaxDetail: false,
      isTransportDetailFilled: false,
      transportDetailObj: {},
      taxDetailArr: [],
      poReceivePrint: false,
      lineData: [],
      childAttributesList: [],
      gateEntryuniquepoId: [],
      childAttributeObj: {},
      childAttrReqError: false,
      noOfPallet: 1,
      remainQty: "",
      item: "",
      poLineIndex: 0,
      itemUomConvRate: 1,
      isItemConvRateDisable: true,
      gateEntryDate: "",
      physicalQtyKey: 0,
      poID: "",
      PODetailsID: "",
      polinedataObj: {},
      lineNo: null,
      countryCode: "",
      gateSearchObj: {
        table: "EvolveGate",
        value_field: "_id",
        display_field: "EvolveGate_Number",
        value: "",
        disable: false,
        defultCondction: [
          {
            id: uniqueID(),
            field: "EvolveUnit_ID",
            operator: "in",
            value: useStore().user.EvolveUnit_ID,
            collectionName: "EvolveGate",
          },
        ],
      },

      gateEntrySearchObj: {
        table: "EvolveGateEntry",
        value_field: "EvolveGateEntry_Number",
        display_field: "EvolveGateEntry_Number",
        value: "",
        disable: false,
        defultCondction: [
          {
            id: uniqueID(),
            field: "EvolveUnit_ID",
            operator: "in",
            value: useStore().user.EvolveUnit_ID,
            collectionName: "EvolveGateEntry",
          },
        ],
      },

      supplierSearchObj: {
        table: "EvolveSupplier",
        value_field: "_id",
        display_field: "EvolveSupplier_Name",
        blur_field: "EvolveSupplier_Code",
        value: "",
        disable: false,
      },

      locationSearchObj: {
        table: "EvolveLocation",
        value_field: "_id",
        display_field: "EvolveLocation_Code",
        value: "",
        disabled: false,
        defultCondction: [
          {
            id: uniqueID(),
            field: "EvolveUnit_ID",
            operator: "in",
            value: useStore().user.EvolveUnit_ID,
            collectionName: "EvolveLocation",
          },
        ],
      },
      poSearchObj: {
        table: "EvolvePO",
        value_field: "_id",
        display_field: "EvolvePO_Number",
        value: "",
        disable: false,
        defultCondction: [
          {
            id: uniqueID(),
            field: "EvolveSupplier_ID",
            operator: "in",
            value: this.supplierId,
            collectionName: "EvolvePO",
          },
          {
            id: uniqueID(),
            field: "EvolvePO_DOAStatus",
            operator: "in",
            value: "A",
            collectionName: "EvolvePO",
          },
          {
            id: uniqueID(),
            field: "EvolveUnit_ID",
            operator: "in",
            value: useStore().user.EvolveUnit_ID,
            collectionName: "EvolvePO",
          },
          {
            id: uniqueID(),
            field: "EvolvePO_Status",
            operator: "in",
            value: "R",
            collectionName: "EvolvePO",
          },
        ],
      },
      poLineSearchObj: {
        table: "EvolvePO",
        arrayName: "EvolvePODetails",
        value_field: "LineId",
        display_field: ["EvolvePO_Number", "EvolveItem_Code"],
        head: [
          { searchKey: "EvolveItem_Code", lable: "Item Code" },
          { searchKey: "EvolvePODetails_Line", lable: "Line Number" },
          { searchKey: "EvolveItem_Desc", lable: "Item Desc" },
          { searchKey: "EvolvePO_Number", lable: "Po Number" },
        ],
        displayLine_fields: [
          "EvolveItem_Code",
          "EvolveItem_ID",
          "EvolveUom_ID",
          "EvolvePODetails_Line",
          "EvolveItem_Desc",
          "EvolveItem_Desc2",
          "EvolvePO_Number",
          "EvolvePODetails_IsMemoItem",
          "EvolvePODetails_NeedDate",
          "EvolveUom_Uom",
          "EvolvePODetails_Qty",
          "EvolvePODetails_UnitCost",
          "EvolvePODetails_TotalPrice",
          "EvolvePOTaxDetails",
          "EvolvePODetails_Type",
          "EvolveWorkOrder_ID",
          "EvolvePODetails_ReceiveQty",
          "EvolvePODetails_RemainingQty",
          "EvolvePODetails_ReturnQty",
          "EvolveLocation_ID",
          "EvolveLocation_Code",
        ],
        value: "",
        disable: true,
      },

      uomSearchObj: {
        table: "EvolveUom",
        value_field: "_id",
        display_field: "EvolveUom_Uom",
        value: "",
        disable: true,
      },

      stockUomSearchObj: {
        table: "EvolveUom",
        value_field: "_id",
        display_field: "EvolveUom_Uom",
        value: "",
        disable: true,
      },
      itemSearchObj: {
        table: "EvolveItem",
        value_field: "_id",
        display_field: "EvolveItem_Code",
        value: "",
        disable: false,
        defultCondction: [
          {
            id: uniqueID(),
            field: "EvolveBusinessGroup_ID",
            operator: "in",
            value: useStore().user.EvolveBusinessGroup_ID,
            collectionName: "EvolveItem",
          },
        ],
      },
      unitCostKey: 0,
      reloadItem: 0,
      itemId: null,
      reInitIsAllCheck: Math.random(),
      isAllSelected: true,
      poItemList: [],
      socket: null,
    };
  },

  computed: {},

  watch: {
    mdIconsSearch(val) {
      this.mdIcons.forEach((icon) => {
        if (val !== "" && val.length > 2) {
          icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
        } else {
          icon.visible = true;
        }
      });
    },
  },

  mounted() {
    this.$eventBus.$on(this.helpMasterCode, (data) => {
      let thisObj = this;
      Object.keys(this.keywords).forEach(function (key) {
        if (data) {
          data.forEach(function (obj) {
            if (obj[key] != undefined) {
              thisObj.keywords[key].val = obj[key].tran; // Translated
              thisObj.keywords[key].ttps = obj[key].ttps; // Tooltips
            }
          });
        }
      });
    });

    this.$eventBus.$on("onCloseTabCalled", (url) => {
		console.log("recurl:::::::::::" , url);
      if (this.pageURL == url) {
        this.$destroy();
      }
    });
  },

  created: async function () {

    this.v$ = useVuelidate();

    useStore().loadPageData({
      masterCode: this.helpMasterCode,
      keywords: this.keywords,
    });

    await this.getPrinterData();
    await this.getDeviceList();
    await this.deviceSocket(null);
    await this.getShipViaDetail();
    this.socket = this.$nuxtSocket({
      persist: false,
      reconnection: false,
    });

    this.socket.on(this.device, async (data) => {
      console.log("SocketCalledSocketCalled", this.device);
      console.log("datadatadatadata???", data);

      await this.calculateWeight(data.Data.weightkg);
    });

    if (this.poRecieveId != "" && this.poRecieveId != undefined) {
      this.selectSingleData({
        operation: "SL",
        _id: this.poRecieveId,
      });
    }
    if (this.isViewOnly) {
      this.gateSearchObj.disable = this.isViewOnly;
      this.gateEntrySearchObj.disable = this.isViewOnly;
      this.supplierSearchObj.disable = this.isViewOnly;
      this.locationSearchObj.disable = this.isViewOnly;
      this.poSearchObj.disable = this.isViewOnly;
      this.poLineSearchObj.disable = this.isViewOnly;
      this.uomSearchObj.disable = this.isViewOnly;
      this.stockUomSearchObj.disable = this.isViewOnly;
      this.itemSearchObj.disable = this.isViewOnly;
      this.reloadInitgateNo += 1;
      this.reloadInit += 1;
      this.reloadItem += 1;
      this.reloadInitLocation += 1;
      this.reinitUom += 1;
      this.tempreInit += 1;
      this.reloadInit1 += 1;
    }
  },

  validations() {
    return {
      invoiceNo: {
        required,
      },
      invoiceDate: {
        required,
      },
      gateId: {
        required,
      },
      supplierId: {
        required,
      },
      qty: {
        required,
        minValue: minValue(0.000001),
      },
      stockQty: {
        required: requiredIf(function () {
          return this.stockQtyR;
        }),
      },

      locationId: {
        required: requiredIf(function () {
          return this.locationIdR;
        }),
      },
      comments: {
        required: requiredIf(function () {
          return this.commentsR;
        }),
      },
      stockUom: {
        required: requiredIf(function () {
          return this.stockUomR;
        }),
      },
      uom: {
        required: requiredIf(function () {
          return this.uomR;
        }),
      },
      lotNo: {
        maxLength: maxLength(18),
        required,
      },
      refNo: {
        maxLength: maxLength(8),
      },
      noOfPallet: {
        minValue: minValue(1),
      },
    };
  },


  methods: {
    getShipViaDetail: async function () {
      try {
        let data = {
          collctionName: "EvolveGenCode",
          selectedFild: [
            "EvolveGenCode_Code",
            "EvolveGenCode_Value",
            "EvolveGenCode_Desc",
            "_id",
          ],
          condition: { EvolveGenCode_Code: "po_ship_via" },
        };
        let shipViaRes = await this.$axios
          .$post("/api/v1/evolve/getselect2List", data)
          .catch((e) => {
            console.log("Error Come in shipViaRes Catch : ", error.message);
            useStore().evolveNotification({ code: 111, type: 2 });
          });
        if (shipViaRes.statusCode == 200 && shipViaRes.result.length != 0) {
          this.shipViaDetail = shipViaRes.result;
        } else {
          console.error("Error In shipViaRes :::::::::::::");
          useStore().evolveNotification({
            code: 120,
            type: 2,
            var: ["Ship Via Detail"],
            pos: "BL",
          });
        }
      } catch (error) {
        console.error(
          "Error Come In Catch getShipViaDetail>>>>>>> " +
            this.helpMasterCode +
            error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    deviceSocket: async function (device) {
      try {
        if (device == null) {
          this.socket?.disconnect();
        } else {
          this.device = device;
          this.socket.on(this.device, async (data) => {
            console.log("SocketCalledSocketCalled", this.device);
            console.log("datadatadatadata???", data);

            await this.calculateWeight(data.Data.weightkg);
          });
        }
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeGateNo: async function (data) {
      try {
        this.poLineArr = [];
        this.invoiceNo = "";
        this.gateId = "";
        this.gateSearchObj.value = "";
        this.supplierId = null;
        this.supplierSearchObj.defultCondction = [];
        this.supplierSearchObj.value = "";
        this.vehicleRef = "";
        this.reloadInit = +1;
        if (data) {
          let gateEntryData = await this.$axios
            .$post("/api/v3/evolve/purchaseOrderRecieve/scanGateEntryNo", {
              EvolveGateEntry_Number: this.gateNo,
            })
            .catch((e) => {
              console.error("Error Come In Catch", e.message);
              useStore().evolveNotification({ code: 117 });
            });
          if (gateEntryData) {
            if (gateEntryData.statusCode == 200) {
              // console.log("the gateEntryData of scan is :::::", gateEntryData.result);
              if (gateEntryData.result != null) {
                let docType = gateEntryData.result.docType;
                if (docType == "PO") {
                  this.poLineArr = [];
                  let lineData =
                    gateEntryData.result.EvolveGateEntry_MaterialDetails
                      .EvolveGateEntry_MaterialDocDetails;
                  this.invoiceNo = lineData[0].EvolveGateEntryDocSInput_No;
                  this.gateId = gateEntryData.result.EvolveGateIN_ID;
                  this.gateSearchObj.value = this.gateId;
                  this.supplierId = gateEntryData.result.EvolveSupplier_ID[0];
                  this.supplierSearchObj.defultCondction = [];
                  this.vehicleRef =
                    gateEntryData.result.EvolveGateEntry_MaterialDetails.EvolveGateEntry_VehNo;
                  for (
                    let j = 0;
                    j < gateEntryData.result.EvolveSupplier_ID.length;
                    j++
                  ) {
                    this.supplierSearchObj.defultCondction.push({
                      id: uniqueID(),
                      field: "_id",
                      operator: "in",
                      value: gateEntryData.result.EvolveSupplier_ID[j],
                      collectionName: "EvolveSupplier",
                    });
                  }
                  this.supplierSearchObj.value = this.supplierId;
                  this.reloadInit += 1;

                  for (let i = 0; i < lineData.length; i++) {
                    if (
                      lineData[i].EvolveGateEntryDoc_ByPoLine == "" ||
                      lineData[i].EvolveGateEntryDoc_ByPoLine == null ||
                      lineData[i].EvolveGateEntryDoc_ByPoLine == undefined ||
                      lineData[i].EvolveGateEntryDoc_ByPoLine == false
                    ) {
                      this.invoiceDate =
                        lineData[i].EvolvePoRecieve_InvoiceDate;
                      this.poSearchObj.defultCondction.push({
                        id: uniqueID(),
                        field: "_id",
                        operator: "in",
                        value: lineData[i].EvolvePO_ID,
                        collectionName: "EvolvePO",
                      });
                      this.gateEntryuniquepoId.push(
                        lineData[i].EvolvePO_Number
                      );
                    } else {
                      this.invoiceDate =
                        lineData[i].EvolvePoRecieve_InvoiceDate;
                      this.polinedataObj = lineData[i];
                      await this.addPoLine(false);
                    }
                  }
                } else if (docType == "ASN") {
                  this.poLineArr = [];
                  let lineData =
                    gateEntryData.result.EvolveGateEntry_MaterialDetails
                      .EvolveGateEntry_MaterialDocDetails;
                  this.invoiceNo = lineData[0].EvolveGateEntryDocSInput_No;
                  this.gateId = gateEntryData.result.EvolveGateIN_ID;
                  this.gateSearchObj.value = this.gateId;
                  this.supplierId = gateEntryData.result.EvolveSupplier_ID[0];
                  this.supplierSearchObj.defultCondction = [];
                  this.vehicleRef =
                    gateEntryData.result.EvolveGateEntry_MaterialDetails.EvolveGateEntry_VehNo;
                  for (
                    let j = 0;
                    j < gateEntryData.result.EvolveSupplier_ID.length;
                    j++
                  ) {
                    this.supplierSearchObj.defultCondction.push({
                      id: uniqueID(),
                      field: "_id",
                      operator: "in",
                      value: gateEntryData.result.EvolveSupplier_ID[j],
                      collectionName: "EvolveSupplier",
                    });
                  }
                  this.supplierSearchObj.value = this.supplierId;
                  this.reloadInit += 1;

                  for (let i = 0; i < lineData.length; i++) {
                    this.invoiceDate = lineData[i].EvolvePoRecieve_InvoiceDate;
                    this.polinedataObj = lineData[i];
                    await this.addPoLine(false);
                  }
                }
              } else {
                useStore().evolveNotification({
                  code: 123,
                  var: [`Gate Entry`],
                });
                this.gateEntrySearchObj.value = "";
                this.gateNo = "";
                this.reloadInitgateNo += 1;
              }
            } else if (gateEntryData.statusCode == 300) {
              useStore().evolveNotification({
                code: 282,
                var: [
                  gateEntryData.result.EvolveGateEntry_Number +
                    " With  Invoice No: " +
                    gateEntryData.result.EvolvePoRecieve_InvoiceNumber,
                ],
              });
            } else {
              useStore().evolveNotification({
                code: gateEntryData.messageCode,
                var: [`${gateEntryData.message}`],
              });
            }
          }
        } else {
          this.invoiceDate = "";
          this.gateEntryuniquepoId = [];
          this.poSearchObj.defultCondction = [
            {
              id: uniqueID(),
              field: "EvolveSupplier_ID",
              operator: "in",
              value: this.supplierId,
              collectionName: "EvolvePO",
            },
            {
              id: uniqueID(),
              field: "EvolvePO_DOAStatus",
              operator: "in",
              value: "A",
              collectionName: "EvolvePO",
            },
            {
              id: uniqueID(),
              field: "EvolveUnit_ID",
              operator: "in",
              value: this.unitId,
              collectionName: "EvolvePO",
            },
            {
              id: uniqueID(),
              field: "EvolvePO_Status",
              operator: "in",
              value: "R",
              collectionName: "EvolvePO",
            },
          ];
        }
      } catch (error) {
        console.error(
          "Error Come In Catch onChangeGateNo>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    getAttributesList: async function (EvolveItem_ID, index) {
      try {
        let response = await this.$axios
          .$post("/api/v3/evolve/purchaseOrderRecieve/getAttributeList", {
            EvolveItem_ID: EvolveItem_ID, //
          })
          .catch((e) => {
            console.error("Error Come in catch", e.message);
            useStore().evolveNotification({ code: 117, type: 2 });
          });

        if (response) {
          if (response.statusCode == 200) {
            this.poLineArr[index].childAttributesList =
              response.result.childAttributesList;
          }
        }
      } catch (error) {
        console.error(
          "Error Come In Catch getAttributesList >>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeSupplier: function (data) {
      try {
        if (data != "") {
          this.supplierCode = data.EvolveSupplier_Code;
          this.supplierName = data.EvolveSupplier_Name;
        } else {
          this.supplierCode = "";
          this.supplierName = "";
        }
      } catch (error) {
        console.error(
          "Error Come In Catch onChangeSupplier >>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onRowClickeSupplier: function (data) {
      try {
        if (data != "") {
          this.supplierCode = data.EvolveSupplier_Code;
          this.supplierName = data.EvolveSupplier_Name;
          this.onChangeInvNo();
        } else {
          this.supplierCode = "";
          this.supplierName = "";
          this.enableAddPoLine();
        }
      } catch (error) {
        console.error(
          "Error Come In Catch onRowClickeSupplier>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeGate: function (data) {
      try {
        if (data != "") {
          this.gateEntryNumber = data.EvolveGate_Number;
        } else {
          this.gateEntryNumber = "";
        }
      } catch (error) {
        console.error("Error Come In Catch onChangeGate>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    getPrinterData: async function () {
      try {
        let printerInfo = await this.$axios
          .$post("/api/v3/evolve/purchaseOrderRecieve/getPrinterData", {
            EvolveUnit_ID: this.unitId,
          })
          .catch((e) => {
            console.error("Error Come In Catch", e.message);
            useStore().evolveNotification({ code: 117 });
          });

        console.log("printerInfo::::", printerInfo);
        if (printerInfo) {
          if (printerInfo.statusCode == 200) {
            this.printerLabel = printerInfo.records.EvolveDefaultLabel_ID;

            this.poReceivePrint = printerInfo.records.poReceivePrint;
            this.printerData = printerInfo.records;
          }
        }
      } catch (error) {
        console.error(
          "Error Come In Catch getPrinterData>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    getDeviceList: async function () {
      try {
        let List = await this.$axios
          .$get("/api/v3/evolve/purchaseOrderRecieve/getDeviceList")
          .catch((e) => {
            console.error("Error Come In Catch", e.message);
            useStore().evolveNotification({ code: 117 });
          });
        if (List) {
          if (List.statusCode == 200) {
            this.deviceList = List.records;
            this.device =
              this.deviceList[0] != undefined
                ? this.deviceList[0].EvolveDevice_MacID
                : "";
          }
        }
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    addPoLine: async function (data) {
      try {
        let error = false;
        if (data) {
          // this.v$.PODetailsID.$touch();this.v$.poID.$touch();
          if (
            this.PODetailsID == undefined ||
            this.PODetailsID == "" ||
            this.poID == undefined ||
            this.poID == ""
          ) {
            error = true;
            useStore().evolveNotification({
              code: 107,
              pos: "BL",
              type: 2,
              time: 1000,
            });
          }
        }

        if (!error) {
          if (this.polinedataObj) {
            this.polinedataObj.physicalQty = 0;
            this.polinedataObj.addEnable = true;

            this.polinedataObj.physicalQtyDisable =
              this.polinedataObj.EvolvePODetails_Type.toLowerCase() == "s"
                ? true
                : false;

            if (this.poLineArr.length > 0) {
              if (this.poLineType != null) {
                if (
                  !this.poLineType.includes(
                    this.polinedataObj.EvolvePODetails_Type.toLowerCase()
                  )
                ) {
                  // this.poLineArr.splice(index, 1);
                  error = true;
                  useStore().evolveNotification({
                    code: 200,
                    var: [this.poLineType],
                  });
                } else {
                  this.poLineType =
                    this.polinedataObj.EvolvePODetails_Type.toLowerCase() ==
                      "" ||
                    this.polinedataObj.EvolvePODetails_Type.toLowerCase() == "m"
                      ? ["", "m"]
                      : this.polinedataObj.EvolvePODetails_Type.toLowerCase() ==
                        "s"
                      ? ["s"]
                      : [""];
                }
              } else {
                this.poLineType =
                  this.polinedataObj.EvolvePODetails_Type.toLowerCase() == "" ||
                  this.polinedataObj.EvolvePODetails_Type.toLowerCase() == "m"
                    ? ["", "m"]
                    : this.polinedataObj.EvolvePODetails_Type.toLowerCase() ==
                      "s"
                    ? ["s"]
                    : [""];
              }
            } else {
              this.poLineType =
                this.polinedataObj.EvolvePODetails_Type.toLowerCase() == "" ||
                this.polinedataObj.EvolvePODetails_Type.toLowerCase() == "m"
                  ? ["", "m"]
                  : this.polinedataObj.EvolvePODetails_Type.toLowerCase() == "s"
                  ? ["s"]
                  : [""];
            }

            if (!error) {
              this.poLineArr.push(this.polinedataObj);
            }

            this.enableSupplier();
            this.polinedataObj = {};

            this.PODetailsID = null;
            this.poLineSearchObj.value = "";
            this.reinit += 1;
            this.poID = null;
            this.poSearchObj.value = "";
            this.reloadInit1 += 1;
            //   this.v$.$reset();

            console.log("this.supplierId", this.supplierId);
            UIkit.modal("#Add-Po-Line" + this.uniqId).hide();
          }
        }
      } catch (error) {
        console.error(
          "Error Come In Catch getDeviceList>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },
    addPoLinedata: async function () {
      try {
        this.isPolinecall = true;
        this.poSearchObj.defultCondction[0].value = this.supplierId;
        this.PODetailsID = null;
        this.poLineSearchObj.value = "";
        this.poLineSearchObj.disable = true;
        this.reinit += 1;
        this.poID = null;
        this.poSearchObj.value = "";
        this.reloadInit1 += 1;
        this.v$.$reset();

        UIkit.modal("#Add-Po-Line" + this.uniqId).show();
      } catch (error) {
        console.error(
          "Error Come In Catch addPoLinedata>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },
    async resetAddlineDetails() {
      try {
        this.PODetailsID = null;
        this.poLineSearchObj.value = "";
        this.poLineSearchObj.disable = true;
        this.reinit += 1;
        this.poID = null;
        this.poSearchObj.value = "";
        this.reloadInit1 += 1;

        UIkit.modal("#Add-Po-Line" + this.uniqId).hide();
      } catch (error) {
        console.log("Error Come in Catch : ", error.message);
        useStore().evolveNotification({ code: 111, type: 2 });
      }
    },

    enableAddPoLine: async function () {
      try {
        if (
          this.invoiceNo != "" &&
          this.supplierId != null &&
          this.gateId != null &&
          this.gateId != "" &&
          !this.isGrnGenerated &&
          this.invoiceDate != ""
        ) {
          this.addIsDisable = false;
        } else {
          this.addIsDisable = true;
        }
      } catch (error) {
        console.error(
          "Error Come In Catch enableAddPoLine>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    enableSupplier: async function () {
      try {
        if (this.poLineArr.length == 0) {
          this.supplierSearchObj.disable = false;
        } else {
          this.supplierSearchObj.disable = true;
        }
      } catch (error) {
        console.error(
          "Error Come In Catch enableSupplier>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeInvNo: async function () {
      try {
        // this.clearAllData();

        if (this.invoiceNo != "" && this.supplierId != null) {
          let data = {
            operation: "LS",
            EvolvePoRecieve_InvoiceNumber: this.invoiceNo,
            EvolveSupplier_ID: this.supplierId,
          };
          let poRecDetail = await this.$axios
            .$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", data)
            .catch((e) => {
              console.error("Error Come In Catch", e.message);
              useStore().evolveNotification({ code: 117 });
            });

          if (poRecDetail) {
            if (poRecDetail.statusCode == 200) {
              let data = poRecDetail.result;
              if (data.records != null) {
                if (data.isGrnGenerated) {
                  useStore().evolveNotification({
                    code: 167,
                    var: [this.invoiceNo, this.supplierCode],
                  });
                  this.poRecieveId = "";
                  this.invoiceNo = "";
                  this.supplierSearchObj.value = "";
                  this.supplierId = "";
                  this.supplierCode = "";
                  // this.reloadInit +=1 ;
                  this.isGrnGenerated = true;
                } else {
                  useStore().evolveNotification({
                    code: 288,
                    var: [this.invoiceNo, this.supplierCode],
                  });
                  this.poRecieveId = "";
                  this.invoiceNo = "";
                  this.supplierSearchObj.value = "";
                  this.supplierId = "";
                  this.supplierCode = "";
                  this.reloadInit += 1;
                  // this.isGrnGenerated = true;

                  // this.isGrnGenerated = false;
                  // this.poRecieveId = data.records._id;

                  // this.gateId =  data.records.EvolveGate_ID;
                  // this.supplierId = data.records.EvolveSupplier_ID;

                  // this.gateSearchObj.value = this.gateId;
                  // this.supplierSearchObj.value = this.supplierId;

                  // this.poLineArr = data.records.EvolvePoRecieveDetails;
                  // this.taxDetailArr = data.records.EvolvePoRecieve_EnteredTaxDetails;
                  // this.transportDetailObj = data.records.EvolvePoRecieve_TransDetails;

                  // this.shipDate = this.transportDetailObj.EvolvePoRecieve_ShipDate;
                  // this.shipVia = this.transportDetailObj.EvolvePoRecieve_ShipVia;
                  // this.fob = this.transportDetailObj.EvolvePoRecieve_Fob;
                  // this.transMode = this.transportDetailObj.EvolvePoRecieve_TransMode;
                  // this.vehicleRef = this.transportDetailObj.EvolvePoRecieve_VehicleRef;
                  // this.voyage = this.transportDetailObj.EvolvePoRecieve_Voyage;
                  // this.origin = this.transportDetailObj.EvolvePoRecieve_Origin;
                  // this.portDepart = this.transportDetailObj.EvolvePoRecieve_PortDepart;
                  // this.portArrive = this.transportDetailObj.EvolvePoRecieve_PortArrive;
                  // this.remarks = this.transportDetailObj.EvolvePoRecieve_Remarks;

                  // this.reloadInit1+=1;
                  // this.addIsDisable = false;
                }
              } else {
                this.isGrnGenerated = false;
              }
            } else {
              useStore().evolveNotification(poRecDetail.message);
            }
          }

          this.gateSearchObj.disable = false;
          this.enableSupplier();
          this.reloadInit += 1;
          this.enableAddPoLine();
        }
      } catch (error) {
        console.error("Error Come In Catch onChangeInvNo>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeUnit: async function (data) {
      try {
        if (data != "") {
          this.unitCode = data.EvolveUnit_Code;
        }
      } catch (error) {
        console.error("Error Come In Catch onChangeUnit>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onRawClickPo: async function (data) {
      try {
        console.log("DATA>>>>>>>>>>", data);
        let error = false;
        if (data != "") {
          if (this.poLineArr.length > 1) {
            if (
              data.EvolvePO_TaxEnvironment != this.poTaxEnv &&
              this.poTaxEnv != ""
            ) {
              error = true;
              useStore().evolveNotification({ code: 197 });
            } else {
              this.poTaxEnv = data.EvolvePO_TaxEnvironment;
            }
          } else {
            this.poTaxEnv = data.EvolvePO_TaxEnvironment;
          }

          if (!error) {
            // let country = await this.$axios
            // 	.$post("/api/v3/evolve/purchaseOrderRecieve/getSupplierCountry", data)
            // 	.catch((e) => {
            // 		console.error("Error Come In Catch", e.message);
            // 		useStore().evolveNotification( {code: 117});
            // 	});

            // console.log("COUNTRYLLLL", country);
            // console.log("country.records.EvolveCountry_Code", country.records.EvolveCountry_Code);

            // if(country){
            // 	if(country.statusCode == 200){
            // 		countryCode = country.records.EvolveCountry_Code;
            // 		let findindex = this.poLineArr.findIndex((v)=> v.EvolveCountry_Code!= undefined);
            // 		if (findindex==-1) {
            // 			this.poLineArr[index]["EvolveCountry_Code"] = countryCode;
            // 		}

            // 	}
            // }
            // console.warn("this.poLineArr>>>", this.poLineArr[index]["EvolveCountry_Code"]);

            // if (countryCode!="") {
            // 	let findindex = this.poLineArr.findIndex((v)=> v.EvolveCountry_Code!= undefined && v.EvolveCountry_Code!= "" && v.EvolveCountry_Code != countryCode );
            // 	findindex==-1 ? error = false : error = true;

            // }
            // if(error){
            // 	this.poLineArr.splice(index, 1);
            // 	this.reloadInit1+=1;
            // 	useStore().evolveNotification( {code: 199});
            // }else{
            // this.countryCode=countryCode
            this.poLineSearchObj.disable = false;

            this.poLineSearchObj.headLevelCondition = [
              {
                id: uniqueID(),
                field: "EvolvePO_Number",
                operator: "in",
                value: data.EvolvePO_Number,
                collectionName: "EvolvePO",
              },
            ];
            this.poLineSearchObj.defultCondction = [
              {
                id: uniqueID(),
                field: "EvolvePODetails_Status",
                operator: "in",
                value: "O",
                collectionName: "EvolvePO",
              },
            ];
            this.reinit += 1;
            // }
          }
        } else {
          this.poLineSearchObj.value = "";
          this.poLineSearchObj.disable = true;
          this.PODetailsID = "";
          this.reinit += 1;
        }
      } catch (error) {
        console.error("Error Come In Catch onRawClickPo>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onRawClickPoLine: async function (data) {
      try {
        console.log("onRawClickPoLine::::::::::::::", data);
        let error = false;
        if (data) {
          // let d = this.poLineArr[index];

          data.EvolvePODetails_NeedDate = data.EvolvePODetails_NeedDate
            ? data.EvolvePODetails_NeedDate.toLocaleString().split("T")[0]
            : "-";

          if (data.EvolvePODetails_NeedDate != "-") {
            let today = new Date();
            // (YYYY-MM-DD)
            let dueDate = new Date(data.EvolvePODetails_NeedDate);
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);

            if (this.isPoLineDuedate && today.getTime() > dueDate.getTime()) {
              this.isPolinecall = true;
              error = true;
              useStore().evolveNotification({
                code: 203,
                var: ["Due Date", "today's date"],
                type: 2,
              });
            }
          }
          if (!error) {
            data.EvolvePODetails_TotalPrice = parseFloat(
              data.EvolvePODetails_TotalPrice
            );
            data.EvolvePODetails_UnitCost = parseFloat(
              data.EvolvePODetails_UnitCost
            );
            data.EvolvePODetails_EnteredUnitCost = parseFloat(
              data.EvolvePODetails_UnitCost
            );

            console.log("this.poLineArr>>>", this.poLineArr);
            if (this.poLineArr.length > 0) {
              if (this.poLineType != null) {
                if (
                  !this.poLineType.includes(
                    data.EvolvePODetails_Type.toLowerCase()
                  )
                ) {
                  // this.poLineArr.splice(index, 1);
                  error = true;
                  useStore().evolveNotification({
                    code: 200,
                    var: [this.poLineType],
                  });
                } else {
                  this.poLineType =
                    data.EvolvePODetails_Type.toLowerCase() == "" ||
                    data.EvolvePODetails_Type.toLowerCase() == "m"
                      ? ["", "m"]
                      : data.EvolvePODetails_Type.toLowerCase() == "s"
                      ? ["s"]
                      : [""];
                }
              } else {
                this.poLineType =
                  data.EvolvePODetails_Type.toLowerCase() == "" ||
                  data.EvolvePODetails_Type.toLowerCase() == "m"
                    ? ["", "m"]
                    : data.EvolvePODetails_Type.toLowerCase() == "s"
                    ? ["s"]
                    : [""];
              }
            } else {
              this.poLineType =
                data.EvolvePODetails_Type.toLowerCase() == "" ||
                data.EvolvePODetails_Type.toLowerCase() == "m"
                  ? ["", "m"]
                  : data.EvolvePODetails_Type.toLowerCase() == "s"
                  ? ["s"]
                  : [""];
            }
          }

          if (!error) {
            if (parseInt(data.EvolvePODetails_Qty) == 0) {
              let objBody = {
                operation: "GIP",
                itemData: {
                  EvolvePriceList_Code:
                    data.EvolvePODetails_PriceListCode !== undefined
                      ? data.EvolvePODetails_PriceListCode
                      : this.supplierCode,
                  EvolveItem_Code: data.EvolveItem_Code,
                  EvolveUom_Uom: data.EvolveUom_Uom,
                  EvolveUom_ID: data.EvolveUom_ID,
                  EvolvePoRecieve_InvoiceDate: this.invoiceDate,
                },
              };
              let getUnitCost = await this.$axios
                .$post(
                  "/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler",
                  objBody
                )
                .catch((e) => {
                  console.error("Error Come In Catch", e.message);
                  useStore().evolveNotification({ code: 117, type: 2 });
                });

              if (getUnitCost.statusCode == 200) {
                data.EvolvePODetails_UnitCost = getUnitCost.result;
                data.EvolvePODetails_EnteredUnitCost = getUnitCost.result;
              }
            }
          }
          let findIndex =
            this.poLineArr.length > 0
              ? this.poLineArr.findIndex(
                  (v) =>
                    v.EvolvePODetails_Line == data.EvolvePODetails_Line &&
                    v.EvolvePO_Number == data.EvolvePO_Number
                )
              : -1;

          if (!error) {
            if (findIndex == -1) {
              console.log();
              console.log(
                "data.EvolvePODetails_Type",
                data.EvolvePODetails_Type
              );

              data.EvolvePODetails_ID = this.PODetailsID;
              this.polinedataObj = { ...data };
              this.isPolinecall = false;
            } else {
              error = true;
              useStore().evolveNotification({
                code: 165,
                type: 2,
              });
              this.isPolinecall = true;
            }
          }

          // if (!error) {
          // 	this.polinedataObj.addEnable = true;

          // }

          console.log("error>>>>>>>>", error);
          if (error) {
            this.PODetailsID = null;
            this.poLineSearchObj.value = "";
            this.reinit += 1;
            //    this.poID=null
            //    this.poSearchObj.value=''
            //    this.reloadInit1+=1
          }
        } else {
          this.isPolinecall = true;
          this.PODetailsID = null;
          this.poLineSearchObj.value = "";
          this.reinit += 1;
        }
      } catch (error) {
        console.error("Error Come In Catch>>> PO Line>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeUom: async function (data) {
      try {
        if (data != "") {
          this.uomCode = data.EvolveUom_Uom;
        }
      } catch (error) {
        console.error("Error Come In Catch onChangeUom>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    // onChangeStockUom: async function (data){
    // 	try{
    // 		if (data!="" && data!=undefined) {
    // 			this.stockUomCode = data.EvolveUom_Uom;
    // 			console.log("this.itemUomConvRate>>>>>>>>>>>>.zala", this.itemUomConvRate);
    // 			if (this.uomCode == this.stockUomCode) {
    // 				console.log('---------------------------inner');
    // 				this.itemUomConvRate = 1;
    // 				this.isItemConvRateDisable = true;
    // 			}
    // 		}
    // 	} catch (error) {
    // 		console.error("Error Come In Catch onChangeStockUom>>>>>>>", error.message);
    // 		useStore().evolveNotification( {code: 111, type: 2, var: [`${error.message}`]});
    // 	}
    // },

    onRowClickStockUom: async function (data) {
      try {
        if (data != "" && data != undefined) {
          this.stockUomCode = data.EvolveUom_Uom;
        }
        if (
          data != "" &&
          data != undefined &&
          this.lotSerialNo.toLowerCase() == "s"
        ) {
          await this.onChangeQty();
        }
      } catch (error) {
        console.error(
          "Error Come In Catch onRowClickStockUom>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeQty: async function () {
      try {
        if (this.qty < 0) {
          this.qty = 1;
        }
        if (this.uom != "" && this.stockUom != "") {
          let qty = this.qty;
          this.stockQty = parseFloat(qty) * parseFloat(this.itemUomConvRate);
        }
      } catch (error) {
        console.error("Error Come In Catch onChangeQty>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeLocation: async function (data) {
      try {
        if (data != "" && data != undefined) {
          this.locationCode = data.EvolveLocation_Code;
        }
      } catch (error) {
        console.error(
          "Error Come In Catch onChangeLocation>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onAddPoLineDetail: async function (index) {
      try {
        this.clearPoLineModalData();
        this.isRequiredPoLinedetail(this.poLineArr[index].EvolvePODetails_Type);
        this.currentPoLineIndex = index;

        // console.warn('this.poLineArr[this.currentPoLineIndex]:::::::::::', this.poLineArr[this.currentPoLineIndex])
        this.uom = this.poLineArr[this.currentPoLineIndex].EvolveUom_ID;
        this.uomCode = this.poLineArr[this.currentPoLineIndex].EvolveUom_Uom;
        this.uomSearchObj.value = this.uom;
        this.item =
          this.poLineArr[this.currentPoLineIndex].EvolveItem_Code +
          "-" +
          this.poLineArr[this.currentPoLineIndex].EvolveItem_Desc;
        this.remainQty = isNaN(
          this.poLineArr[this.currentPoLineIndex].EvolvePODetails_Qty -
            this.poLineArr[this.currentPoLineIndex].EvolvePODetails_ReceiveQty
        )
          ? ""
          : this.poLineArr[this.currentPoLineIndex].EvolvePODetails_Qty -
            this.poLineArr[this.currentPoLineIndex].EvolvePODetails_ReceiveQty;
        this.noOfPallet = 1;
        this.itemUomConvRate = this.poLineArr[this.currentPoLineIndex]
          .EvolvePODetails_UomConValue
          ? this.poLineArr[this.currentPoLineIndex].EvolvePODetails_UomConValue
          : 1;

        for (let qt = 0; qt < this.lineData.length; qt++) {
          if (
            this.lineData[qt].EvolvePO_ID ==
            this.poLineArr[this.currentPoLineIndex].EvolvePO_ID
          ) {
            this.qty = this.lineData[qt].EvolveGateEntry_MaterialQty;
            this.stockQty = this.lineData[qt].EvolveGateEntry_MaterialQty;
          }
        }

        if (this.poLineArr[index].EvolvePODetails_Type.toLowerCase() != "m") {
          let response = await this.$axios
            .$post("/api/v3/evolve/purchaseOrderRecieve/getItemDetails", {
              EvolveItem_ID: this.poLineArr[index].EvolveItem_ID,
              poUom: this.uom,
            })
            .catch((e) => {
              console.error("Error Come In Catch", e.message);
              useStore().evolveNotification({ code: 117, type: 2 });
            });

          if (response) {
            if (response.statusCode == 200) {
              if (
                this.poLineArr[this.currentPoLineIndex].EvolveLocation != "" &&
                this.poLineArr[this.currentPoLineIndex].EvolveLocation !=
                  null &&
                this.poLineArr[this.currentPoLineIndex].EvolveLocation !=
                  undefined
              ) {
                if (
                  this.poLineArr[this.currentPoLineIndex].EvolveLocation
                    .length > 0
                ) {
                  this.locationId =
                    this.poLineArr[
                      this.currentPoLineIndex
                    ].EvolveLocation[0]._id;
                  this.locationCode =
                    this.poLineArr[
                      this.currentPoLineIndex
                    ].EvolveLocation[0].EvolveLocation_Code;
                } else {
                  this.locationId = response.result.EvolveLocation;
                  this.locationCode = response.result.EvolveLocation_Code;
                }
              } else {
                this.locationId = response.result.EvolveLocation;
                this.locationCode = response.result.EvolveLocation_Code;
              }
              console.warn(
                "response.result.itemUomConvRate>>",
                response.result
              );
              this.refNo = response.result.refNo;
              this.lotNo = response.result.lotNo;
              this.lotSerialNo = response.result.lotSerial;
              this.lotNoSerialCode = response.result.EvolveSerial_Code;
              // this.itemUomConvRate = response.result.itemUomConvRate;
              this.stockUom = response.result.EvolvePoRecieve_StockUom;
              this.stockUomSearchObj.value = this.stockUom;
              this.poLineArr[this.currentPoLineIndex].lotSerialNo =
                this.lotSerialNo;
              await this.getAttributesList(
                this.poLineArr[index].EvolveItem_ID,
                index
              );
              this.locationSearchObj.value = this.locationId;

              // await this.setLotAndRefNoValue();

              this.reloadInitLocation += 1;
            } else {
              useStore().evolveNotification(response.message);
            }
          }
        }
        if (
          this.poLineArr[index].EvolvePODetails_Type.toLowerCase() == "m" &&
          this.stockUom == ""
        ) {
          this.stockUom = this.uom;
          this.stockUomSearchObj.value = this.stockUom;
        }
        await this.setLotAndRefNoValue();

        this.reinitUom += 1;

        UIkit.modal("#PO-RECIEVE-LINE-MODAL").show();
      } catch (error) {
        console.error(
          "Error Come In Catch onAddPoLineDetail>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onEditPoLineDetail: async function (index, index1, isOpenFromAddLine) {
      try {
        this.clearPoLineModalData();
        this.currentPoLineIndex = index;
        this.currentPoLineDetailsIndex = index1;
        this.isEditMode = true;

        let response = await this.$axios
          .$post("/api/v3/evolve/purchaseOrderRecieve/getItemDetails", {
            EvolveItem_ID: this.poLineArr[index].EvolveItem_ID,
          })
          .catch((e) => {
            console.error("Error Come In Catch", e.message);
            useStore().evolveNotification({ code: 117, type: 2 });
          });

        if (response) {
          if (response.statusCode == 200) {
            console.warn("lotSerialNo::::::::::::::", response.result);
            this.lotSerialNo = response.result.lotSerial;
          } else {
            useStore().evolveNotification(response.message);
          }
        }

        this.isRequiredPoLinedetail(this.poLineArr[index].EvolvePODetails_Type);
        isOpenFromAddLine ? UIkit.modal("#PO-RECIEVE-LINE-MODAL").show() : "";

        let data = this.poLineArr[index].EvolvePoRecieve_LineDetails[index1];
        let childAttr = this.poLineArr[index];

        if (this.lotSerialNo.toLowerCase() == "l") {
          this.lotNoDisable = true;
          this.refNoDisable = false;
        } else if (
          this.lotSerialNo.toLowerCase() == "p" ||
          this.lotSerialNo.toLowerCase() == "s"
        ) {
          this.refNoDisable = true;
          this.lotNoDisable = true;
        } else {
          this.refNoDisable = false;
          this.lotNoDisable = false;
        }

        /* attribute code */
        let updatedAtt = data.EvolvePoRecieve_LineAttributes;
        if (childAttr.childAttributesList != undefined) {
          if (childAttr.childAttributesList.length > 0) {
            for (let i = 0; i < childAttr.childAttributesList.length; i++) {
              for (let key in updatedAtt) {
                if (
                  childAttr.childAttributesList[i].EvolveAttributes_Lable ===
                  key
                ) {
                  childAttr.childAttributesList[i].EvolveAttributes_Value =
                    updatedAtt[key];
                  // Start Logic For Check Box
                  if (
                    childAttr.childAttributesList[i]
                      .EvolveAttributes_InputType == "CheckBox"
                  ) {
                    let checkArray =
                      childAttr.childAttributesList[
                        i
                      ].EvolveAttributes_Value.split(",");

                    childAttr.childAttributesList[i].SelectToArray.map(
                      function (p) {
                        p.isEnable = false;
                        checkArray.map(function (c) {
                          if (p.key == c) {
                            p.isEnable = true;
                          }
                        });
                      }
                    );
                  } else if (
                    childAttr.childAttributesList[i]
                      .EvolveAttributes_InputType == "MasterLink"
                  ) {
                    childAttr.childAttributesList[i].serarchObj.value =
                      childAttr.childAttributesList[i].EvolveAttributes_Value;
                    this.tempreInit += 1;
                  }
                  // End Logic For Check Box
                }
              }
            }
          }
        }

        /* attribute code */

        this.unitCode = data.EvolveUnit_Code;
        this.locationId = data.EvolveLocation_ID;
        this.locationCode = data.EvolveLocation_Code;
        this.lotNo = data.EvolvePoRecieve_LotNo;
        this.refNo = data.EvolvePoRecieve_RefNo;
        this.supplierLotNo = data.EvolvePoRecieve_SupplierLotNo;
        this.comments = data.EvolvePoRecieve_Comments;
        this.qty = data.EvolvePoRecieve_Qty;
        this.uom = data.EvolvePoRecieve_Uom;
        this.item =
          this.poLineArr[index].EvolveItem_Code +
          "-" +
          this.poLineArr[index].EvolveItem_Desc;
        this.remainQty = isNaN(
          this.poLineArr[index].EvolvePODetails_Qty -
            this.poLineArr[index].EvolvePODetails_ReceiveQty
        )
          ? ""
          : this.poLineArr[index].EvolvePODetails_Qty -
            this.poLineArr[index].EvolvePODetails_ReceiveQty;
        this.noOfPallet = 1;
        this.uomCode = data.EvolvePoRecieve_UomCode;
        this.stockQty = data.EvolvePoRecieve_StockQty;
        this.stockUom = data.EvolvePoRecieve_StockUom;

        this.locationSearchObj.value = this.locationId;
        this.uomSearchObj.value = this.uom;
        this.stockUomSearchObj.value = this.stockUom;

        this.reloadInitLocation += 1;
        this.reinitUom += 1;
        this.reinitRecieveTable += 1;
      } catch (error) {
        console.error(
          "Error Come In Catch onEditPoLineDetail>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onDeletePoLineDetail: async function (index, index2) {
      try {
        if (this.poLineArr[index].EvolvePODetails_ShiperCreated == true) {
          this.poLineArr[index]["EvolvePoRecieve_LineDetails"][
            index2
          ].EvolvePoRecieve_Qty = 0;
          this.poLineArr[index]["EvolvePoRecieve_LineDetails"][
            index2
          ].EvolvePoRecieve_StockQty = 0;
        } else {
          this.poLineArr[index]["EvolvePoRecieve_LineDetails"].splice(
            index2,
            1
          );
        }

        this.poLineArr[this.currentPoLineIndex].pickQty = this.poLineArr[
          this.currentPoLineIndex
        ].EvolvePoRecieve_LineDetails.reduce(
          (a, b) => a + parseFloat(b.EvolvePoRecieve_Qty),
          0
        ).toFixed(2);

        this.poLineArr[this.currentPoLineIndex].physicalQty =
          this.poLineArr[this.currentPoLineIndex].pickQty;
        this.physicalQtyKey += 1;
        this.poLineArr[this.currentPoLineIndex].EvolvePODetails_PhysicalQty =
          this.poLineArr[this.currentPoLineIndex].physicalQty;
        this.reinitRecieveTable += 1;
      } catch (error) {
        console.error(
          "Error Come In Catch onDeletePoLineDetail>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onDeletePoLine: async function (index) {
      try {
        let Deletes = false;
        $(this).prop("disabled", true);
        await UIkit.modal.confirm("Are You Sure Want To Delete..!").then(
          function () {
            Deletes = true;
          },
          function () {
            $(this).prop("disabled", false);
          }
        );
        if (Deletes == true) {
          if (this.poLineArr[index].EvolvePODetails_ShiperCreated == true) {
            this.poLineArr[index].physicalQty = 0;
            this.poLineArr[index].pickQty = 0;
            this.poLineArr[index].EvolvePODetails_PhysicalQty = 0;
            this.poLineArr[index].EvolvePoRecieve_LineDetails.map((x) => {
              x.EvolvePoRecieve_Qty = 0;
              x.EvolvePoRecieve_StockQty = 0;
              return x;
            });
          } else {
            this.poLineArr.splice(index, 1);
            this.poLineArr.push();
            this.enableSupplier();
          }
        }
      } catch (error) {
        console.error(
          "Error Come In Catch onDeletePoLine>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    savePoRecieveLine: async function () {
      try {
        this.v$.$reset();
        this.v$.$touch();
        // let isInvExist  =  this.poLineArr[this.currentPoLineIndex].EvolvePoRecieve_LineDetails.

        // let findIndex =

        // if(this.poLineType.toLowerCase()=="s" && this.poLineArr[this.currentPoLineIndex].EvolvePoRecieve_LineDetails.length>0 && this.isEditMode==false){
        // 	useStore().evolveNotification( {code: 225});
        // 	return;
        // }
        let childAttr =
          this.poLineArr[this.currentPoLineIndex].childAttributesList ==
          undefined
            ? []
            : this.poLineArr[this.currentPoLineIndex].childAttributesList;
        this.stockQtyR = true;
        let obj = {};
        for (let i = 0; i < childAttr.length; i++) {
          if (childAttr[i].EvolveAttributes_IsRequired == true) {
            if (
              childAttr[i].EvolveAttributes_Value == "" ||
              childAttr[i].EvolveAttributes_Value == null ||
              childAttr[i].EvolveAttributes_Value == undefined
            ) {
              this.childAttrReqError = true;
              break;
            } else {
              this.childAttrReqError = false;
            }
          } else {
            this.childAttrReqError = false;
          }

          obj[childAttr[i].EvolveAttributes_Lable] =
            childAttr[i].EvolveAttributes_Value;
          this.poLineArr[this.currentPoLineIndex].childAttributeObj = obj;
        }

        if (
          this.v$.$invalid ||
          this.childAttrReqError ||
          this.qty < 0 ||
          this.stockQty < 0
        ) {
          useStore().evolveNotification({
            code: 107,
            pos: "BL",
            type: 2,
            time: 1000,
          });
        } else {
          if (this.lotSerialNo == "L" && this.lotNo == "") {
            this.lotNoRequired = true;
          } else if (this.lotSerialNo == "P" && this.refNo == "") {
            this.refNoRequired = true;
          } else {
            this.supplierSearchObj.disable = true;
            this.refNoRequired = false;
            this.lotNoRequired = false;

            if (
              this.poLineArr[this.currentPoLineIndex][
                "EvolvePoRecieve_LineDetails"
              ] == undefined
            ) {
              this.poLineArr[this.currentPoLineIndex][
                "EvolvePoRecieve_LineDetails"
              ] = [];
            }
            let arr = [];
            let obj = {
              EvolveUnit_Code: this.unitCode,
              EvolveLocation_ID: this.locationId == "" ? null : this.locationId,
              EvolveLocation_Code: this.locationCode,
              EvolvePoRecieve_LotNo: this.lotNo,
              EvolvePoRecieve_RefNo: this.refNo,
              EvolvePoRecieve_SupplierLotNo: this.supplierLotNo,
              EvolvePoRecieve_Comments: this.comments,
              EvolvePoRecieve_Qty: this.qty,
              EvolvePoRecieve_Uom: this.uom == "" ? null : this.uom,
              EvolvePoRecieve_UomCode: this.uomCode,
              EvolvePoRecieve_StockQty: this.stockQty,
              EvolvePoRecieve_StockUom:
                this.stockUom == "" ? null : this.stockUom,
              EvolvePoRecieve_StockUomCode: this.stockUomCode,
              EvolveUnit_ID: this.unitId,
              EvolvePoRecieve_LineAttributes:
                this.poLineArr[this.currentPoLineIndex].childAttributeObj,
            };

            if (this.isEditMode == false) {
              for (let j = 0; j < this.noOfPallet; j++) {
                let multObj = { ...obj };
                let findIndex =
                  this.poLineArr[this.currentPoLineIndex][
                    "EvolvePoRecieve_LineDetails"
                  ].length > 0
                    ? this.poLineArr[this.currentPoLineIndex][
                        "EvolvePoRecieve_LineDetails"
                      ].findIndex(
                        (v) =>
                          v.EvolveLocation_Code == this.locationCode &&
                          v.EvolvePoRecieve_LotNo == this.lotNo &&
                          v.EvolvePoRecieve_RefNo == this.refNo
                      )
                    : -1;
                if (findIndex == -1) {
                  if (
                    this.poLineType.includes("s") &&
                    this.poLineArr[this.currentPoLineIndex][
                      "EvolvePoRecieve_LineDetails"
                    ].length == 1
                  ) {
                    useStore().evolveNotification({ code: 225 });
                    return;
                  } else {
                    if (
                      this.lotSerialNo.toLowerCase() == "s" ||
                      this.lotSerialNo.toLowerCase() == "p"
                    ) {
                      let response = await this.$axios
                        .$post(
                          "/api/v3/evolve/purchaseOrderRecieve/generateSerial",
                          {
                            EvolveSerial_Code: this.lotNoSerialCode,
                          }
                        )
                        .catch((e) => {
                          console.error("Error Come In Catch", e.message);
                          useStore().evolveNotification({ code: 117, type: 2 });
                        });

                      if (response) {
                        if (response.statusCode == 200) {
                          multObj.EvolvePoRecieve_RefNo = response.result;
                        }
                      }
                    }

                    this.poLineArr[this.currentPoLineIndex][
                      "EvolvePoRecieve_LineDetails"
                    ].push(multObj);

                    if (this.poReceivePrint == "true") {
                      let data = this.poLineArr[this.currentPoLineIndex];
                      arr.push({
                        EvolveItem_Code: data.EvolveItem_Code,
                        EvolveItem_Desc: data.EvolveItem_Desc,
                        EvolvePoRecieve_StockQty: obj.EvolvePoRecieve_StockQty,
                        EvolveSupplier_Code: data.EvolveSupplier_Code,
                        EvolveSupplier_Name: data.EvolveSupplier_Name,
                        EvolvePrintLabel_ID: this.printerLabel,
                        EvolvePrinter_Code:
                          this.printerData.EvolvePrinter_ID.EvolvePrinter_Code,
                      });
                    }
                  }
                } else {
                  this.poLineArr[this.currentPoLineIndex][
                    "EvolvePoRecieve_LineDetails"
                  ][findIndex] = multObj;
                }
              }
            } else {
              this.poLineArr[this.currentPoLineIndex][
                "EvolvePoRecieve_LineDetails"
              ][this.currentPoLineDetailsIndex] = { ...obj };
              if (this.poReceivePrint == "true") {
                let data = this.poLineArr[this.currentPoLineIndex];
                arr.push({
                  EvolveItem_Code: data.EvolveItem_Code,
                  EvolveItem_Desc: data.EvolveItem_Desc,
                  EvolvePoRecieve_StockUom: obj.EvolvePoRecieve_StockUomCode,
                  EvolvePoRecieve_StockQty: obj.EvolvePoRecieve_StockQty,
                  EvolveSupplier_Code: data.EvolveSupplier_Code,
                  EvolveSupplier_Name: data.EvolveSupplier_Name,
                  EvolvePrintLabel_ID: this.printerLabel,
                  EvolvePrinter_Code:
                    this.printerData.EvolvePrinter_ID.EvolvePrinter_Code,
                });
              }
            }

            if (arr.length > 0) {
              if (this.printerData.EvolvePrinter_ID == undefined) {
                useStore().evolveNotification({ code: 211 });
              } else {
                let printerLabel = await this.$axios
                  .$post("/api/v3/evolve/purchaseOrderRecieve/printLabel", {
                    printerData: arr,
                  })
                  .catch((e) => {
                    console.error("Error Come In Catch", e.message);
                    useStore().evolveNotification({ code: 117 });
                  });
                if (printerLabel) {
                  if (printerLabel.statusCode == 200) {
                    useStore().evolveNotification({
                      code: printerLabel.messageCode,
                    });
                  } else {
                    useStore().evolveNotification({
                      code: printerLabel.messageCode,
                    });
                  }
                }
              }
            }

            this.poLineArr[this.currentPoLineIndex].pickQty = this.poLineArr[
              this.currentPoLineIndex
            ].EvolvePoRecieve_LineDetails.reduce(
              (a, b) => a + parseFloat(b.EvolvePoRecieve_Qty),
              0
            ).toFixed(2);

            this.poLineArr[this.currentPoLineIndex].physicalQty =
              this.poLineArr[this.currentPoLineIndex].pickQty;
            this.physicalQtyKey += 1;
            this.poLineArr[
              this.currentPoLineIndex
            ].EvolvePODetails_PhysicalQty =
              this.poLineArr[this.currentPoLineIndex].physicalQty;
            console.log(
              "the obj is>>>>>>>",
              obj.EvolvePoRecieve_LineAttributes
            );
            this.clearPoLineModalData();

            this.reInitHistoryArr += 1;
          }
        }
      } catch (error) {
        console.error(
          "Error Come In Catch savePoRecieveLine>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    clearPorecieveData: async function () {
      try {
        this.gateId = "";
        this.invoiceNo = "";
        this.invoiceDate = "";
        this.supplierId = null;
        this.poLineArr = [];
        this.gateSearchObj.value = "";
        this.supplierSearchObj.value = "";

		    this.hide = true;
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    createPorecieve: async function () {
      try {
        if (this.shipDate == "") {
          this.shipDateRequied = true;
        } else {
          this.shipDateRequied = false;

          this.transportDetailObj = {
            EvolvePoRecieve_ShipDate: this.shipDate,
            EvolvePoRecieve_ShipVia: this.shipVia,
            EvolvePoRecieve_Fob: this.fob,
            EvolvePoRecieve_TransMode: this.transMode,
            EvolvePoRecieve_VehicleRef: this.vehicleRef,
            EvolvePoRecieve_Voyage: this.voyage,
            EvolvePoRecieve_Origin: this.origin,
            EvolvePoRecieve_PortDepart: this.portDepart,
            EvolvePoRecieve_PortArrive: this.portArrive,
            EvolvePoRecieve_Remarks: this.remarks,
          };
          // if(!this.isTransportDetailFilled){
          //
          // }else{

          this.poLineArr.map(function (data) {
            data.EvolvePO_ID = data._id;
            data.EvolvePoRecieve_LineDetails = data.EvolvePoRecieve_LineDetails;
          });

          let obj = {
            EvolvePODetails_Type: this.poLineType,
            EvolveSupplier_Code: this.supplierCode,
            EvolveGateEntry_Number: this.gateNo,
            EvolvePoRecieve_TransDetails: this.transportDetailObj,
            EvolvePoRecieve_EnteredTaxDetails: this.taxDetailArr,
            EvolveUnit_ID: this.unitId,
            EvolvePoRecieve_InvoiceNumber: this.invoiceNo,
            EvolvePoRecieve_InvoiceDate: this.invoiceDate,
            EvolveGate_ID: this.gateId,
            EvolveSupplier_ID: this.supplierId,
            EvolvePoRecieveDetails: this.poLineArr,
            EvolvePoRecieve_WorkOrderDetails: [],
            EvolvePoRecieve_TaxDetails: [],
          };

          let condition = {
            _id: this.poRecieveId,
          };
          let objBody = {
            operation:
              this.poRecieveId == null ||
              this.poRecieveId == "" ||
              this.poRecieveId == undefined
                ? "A"
                : "M",
            poRecieveData: obj,
            condition:
              this.poRecieveId == null ||
              this.poRecieveId == "" ||
              this.poRecieveId == undefined
                ? {}
                : condition,
          };
          console.log("the obj", objBody);
          this.loaderShow();
          let poReciveCreate = await this.$axios
            .$post(
              "/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler",
              objBody
            )
            .catch((e) => {
              console.error("Error Come In Catch", e.message);
              useStore().evolveNotification({ code: 117, type: 2 });
            });

          if (poReciveCreate.statusCode == 200) {
            this.loaderHide();
            useStore().evolveNotification(poReciveCreate.message);
            this.clearPorecieveData();
            // this.$destroy();
            useStore().removeOneTab(this.pageURL);
            this.$eventBus.$emit("onOptionClose", "PORECIEVELIST");
          } else {
            this.loaderHide();
            console.error("Error In Create", poReciveCreate);
            useStore().evolveNotification(poReciveCreate.message);
          }
          // }
        }
        // this.shipDateRequied = false;
      } catch (error) {
        this.loaderHide();
        console.error(
          "Error Come In Catch createPorecieve>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    selectSingleData: async function (data) {
      try {
        if (this.poRecieveId != "") {
          this.loaderShow();
          let poRecDetail = await this.$axios
            .$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", data)
            .catch((e) => {
              this.loaderHide();
              console.error("Error Come In Catch", e.message);
              useStore().evolveNotification({ code: 117 });
            });

          if (poRecDetail) {
            if (poRecDetail.statusCode == 200) {
              this.isDisable = true;
              let data = poRecDetail.result;
              if (
                data.records.EvolvePoRecieve_ProcessStatus &&
                !this.isViewOnly
              ) {
                if (
                  data.records.EvolvePoRecieve_ProcessStatus != "SAVED" &&
                  data.records.EvolvePoRecieve_ProcessStatus != "SHIPERCREATED"
                ) {
                  useStore().evolveNotification({
                    code: 238,
                    var: [
                      "PO Receive Status:",
                      data.records.EvolvePoRecieve_ProcessStatus,
                    ],
                  });
                  useStore().removeOneTab(this.pageURL);
                }
              }
              this.invoiceNo = data.records.EvolvePoRecieve_InvoiceNumber;
              this.invoiceDate = data.records.EvolvePoRecieve_InvoiceDate;
              this.poRecieveId = data.records._id;

              this.gateId = data.records.EvolveGate_ID;
              this.gateNo = data.records.EvolveGateEntry_Number;
              this.gateEntrySearchObj.value = this.gateNo;
              this.gateEntrySearchObj.disable = true;
              this.reloadInitgateNo += 1;
              this.supplierId = data.records.EvolveSupplier_ID;

              this.gateSearchObj.value = this.gateId;
              // this.gateSearchObj.disable = true;

              this.supplierSearchObj.value = this.supplierId;

              this.poLineArr = data.records.EvolvePoRecieveDetails;

              console.warn(
                "data.records.EvolvePoRecieveDetails>>>",
                data.records.EvolvePoRecieveDetails
              );
              console.log(
                "data.records.EvolvePoRecieveDetails>>>",
                data.records.EvolvePoRecieveDetails
              );

              this.taxDetailArr =
                data.records.EvolvePoRecieve_EnteredTaxDetails;
              this.transportDetailObj =
                data.records.EvolvePoRecieve_TransDetails;

              this.shipDate = this.transportDetailObj.EvolvePoRecieve_ShipDate;
              this.shipVia = this.transportDetailObj.EvolvePoRecieve_ShipVia;
              this.fob = this.transportDetailObj.EvolvePoRecieve_Fob;
              this.transMode =
                this.transportDetailObj.EvolvePoRecieve_TransMode;
              this.vehicleRef =
                this.transportDetailObj.EvolvePoRecieve_VehicleRef;
              this.voyage = this.transportDetailObj.EvolvePoRecieve_Voyage;
              this.origin = this.transportDetailObj.EvolvePoRecieve_Origin;
              this.portDepart =
                this.transportDetailObj.EvolvePoRecieve_PortDepart;
              this.portArrive =
                this.transportDetailObj.EvolvePoRecieve_PortArrive;
              this.remarks = this.transportDetailObj.EvolvePoRecieve_Remarks;

              for (let i = 0; i < this.poLineArr.length; i++) {
                this.poLineArr[i].physicalQty = this.poLineArr[i]
                  .EvolvePODetails_PhysicalQty
                  ? this.poLineArr[i].EvolvePODetails_PhysicalQty
                  : this.poLineArr[i].pickQty;
                this.poLineArr[i].physicalQtyDisable =
                  this.poLineArr[i].EvolvePODetails_Type.toLowerCase() == "s"
                    ? true
                    : false;
                await this.getAttributesList(
                  this.poLineArr[i].EvolveItem_ID,
                  i
                );
                this.physicalQtyKey += 1;
              }

              if (this.poLineArr.length > 0) {
                if (this.poLineType == null) {
                  this.poLineType = this.poLineArr[0].EvolvePODetails_Type
                    ? this.poLineArr[0].EvolvePODetails_Type.toLowerCase() ==
                      "s"
                      ? ["s"]
                      : ["", "m"]
                    : [""];
                }
              }
              this.reloadInit1 += 1;
              this.addIsDisable = false;
              this.loaderHide();
            } else {
              this.loaderHide();
              useStore().evolveNotification(poRecDetail.message);
            }
          }

          this.enableSupplier();
          this.reloadInit += 1;
          this.enableAddPoLine();
          this.loaderHide();
        }
      } catch (error) {
        this.loaderHide();
        console.error("Error Come In Catch selectSingleData>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    savePoTransportDetails: async function () {
      try {
        this.v$.$touch();
        let isEmptyRecieve = false;
        let isStatusRight = false;
        let thisl = this;
        this.poLineArr.map(function (v) {
          if (v.EvolvePoRecieve_LineDetails) {
            isEmptyRecieve = false;
            if (v.EvolvePoRecieve_LineDetails.length == 0) {
              isEmptyRecieve = true;
            }
          } else {
            isEmptyRecieve = true;
          }
          if (v.EvolvePODetails_Status.toLowerCase() == "c") {
            isStatusRight = true;
            useStore().evolveNotification({
              code: `Po Line is closed  for ${v.EvolvePO_Number} and Line is ${v.EvolvePODetails_Line}`,
              pos: "BL",
              type: 2,
              time: 1000,
            });
          }
        });

        if (
          this.v$.gateId.$invalid ||
          this.v$.invoiceNo.$invalid ||
          this.v$.invoiceDate.$invalid ||
          this.v$.supplierId.$invalid
        ) {
          useStore().evolveNotification({
            code: 107,
            pos: "BL",
            type: 2,
            time: 1000,
          });
        } else if (isEmptyRecieve || this.poLineArr.length == 0) {
          useStore().evolveNotification({ code: 166 });
        } else if (isStatusRight === false) {
          let isTaxDetailRequired = this.poLineArr.filter(
            (v) => v.EvolvePOTaxDetails.length > 0
          )[0];
          if (isTaxDetailRequired != undefined) {
            this.isTaxDetail = true;
            this.poRecieveId == "" ||
            this.poRecieveId == undefined ||
            this.poRecieveId == null
              ? (this.taxDetailArr = isTaxDetailRequired.EvolvePOTaxDetails)
              : "";
          }
          console.log(
            "this.isTaxDetail",
            this.poLineArr,
            isTaxDetailRequired,
            this.taxDetailArr
          );
          UIkit.modal("#TRANSPORT_MODAL_PORECEIVE").show();
        }
      } catch (error) {
        console.error(
          "Error Come In Catch savePoTransportDetails>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    printDetails: async function (index) {
      try {
        this.printNum = 1;
        this.poLineIndex = index;
        UIkit.modal("#PRINTDETAILS").show();
      } catch (error) {
        console.error("Error In On Click Print Details" + error.message);
      }
    },

    printAllLabel: async function (index) {
      try {
        if (
          this.poLineArr[index]["EvolvePoRecieve_LineDetails"].length > 0 &&
          this.printerData != ""
        ) {
          let arr = [];
          let data = this.poLineArr[index];
          console.log(
            "data.EvolvePoRecieve_LineDetails???",
            data.EvolvePoRecieve_LineDetails
          );
          if (this.printerData.EvolvePrinter_ID == undefined) {
            useStore().evolveNotification({ code: 211 });
          } else {
            console.warn(
              "this.printerLabel:::::::::",
              data.EvolvePoRecieve_LineDetails
            );
            data.EvolvePoRecieve_LineDetails.map((v) =>
              arr.push({
                EvolveItem_Code: data.EvolveItem_Code,
                EvolveItem_Desc: data.EvolveItem_Desc,
                EvolvePoRecieve_Date: new Date().toLocaleDateString(),
                EvolvePoRecieve_StockUom: v.EvolvePoRecieve_StockUomCode,
                EvolvePoRecieve_StockQty: v.EvolvePoRecieve_StockQty,
                EvolveSupplier_Code: this.supplierCode,
                EvolveSupplier_Name: this.supplierName,
                Location_Code: v.EvolveLocation_Code,
                LotNumber: v.EvolvePoRecieve_LotNo,
                RefNumber: v.EvolvePoRecieve_RefNo,
                EvolvePrintLabel_ID: this.printerLabel,
                EvolvePrinter_Code:
                  this.printerData.EvolvePrinter_ID.EvolvePrinter_Code,
              })
            );
            console.log("arr::::", arr);
            let printerLabel = await this.$axios
              .$post("/api/v3/evolve/purchaseOrderRecieve/printLabel", {
                printerData: arr,
                printCopy: this.printNum,
              })
              .catch((e) => {
                console.error("Error Come In Catch", e.message);
                useStore().evolveNotification({ code: 117 });
              });
            if (printerLabel) {
              if (printerLabel.statusCode == 200) {
                this.printNum = 1;
                UIkit.modal("#PRINTDETAILS").hide();
                useStore().evolveNotification({
                  code: printerLabel.messageCode,
                });
              } else {
                UIkit.modal("#PRINTDETAILS").hide();
                useStore().evolveNotification({
                  code: printerLabel.messageCode,
                });
              }
            }
          }
        }
      } catch (error) {
        console.error(
          "Error Come In Catch printAllLabel>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    clearPoLineModalData: async function () {
      try {
        if (
          this.poLineArr[this.currentPoLineIndex] != undefined &&
          this.poLineArr[this.currentPoLineIndex].childAttributesList !=
            undefined
        ) {
          this.poLineArr[this.currentPoLineIndex].childAttributesList.map(
            function (data) {
              data.EvolveAttributes_Value = "";
              if (data.serarchObj != undefined) {
                data.serarchObj.value = "";
              }
            }
          );
        }
        if (this.lotSerialNo.toLowerCase() == "l") {
          this.refNo = "";
        }
        // this.itemUomConvRate = 1;
        // this.isItemConvRateDisable = false;
        this.comments = "";
        this.supplierLotNo = "";
        // this.qty = 0;
        // this.stockQty = "";
        this.isEditMode = false;
        this.refNoRequired = false;
        this.lotNoRequired = false;
        this.stockQtyR = false;
        this.tempreInit += 1;
        this.v$.$reset();
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
      // this.unitId = "";
    },

    isRequiredPoLinedetail: async function (data) {
      try {
        if (data.toLowerCase() == "m") {
          this.locationIdR = false;
          this.stockUomR = false;
          this.uomR = false;
        } else {
          this.locationIdR = true;
          this.stockUomR = true;
          this.uomR = true;
        }
      } catch (error) {
        console.error(
          "Error Come In Catch>>>>>>> isRequiredPoLinedetail",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    clearAllData: async function () {
      try {
        this.poRecieveId = "";
        this.poLineArr = [];
        this.gateId = "";
        this.supplierId = null;
        this.gateSearchObj.value = "";
        this.supplierSearchObj.value = "";
        // this.supplierSearchObj.disable = true;
        // this.gateSearchObj.disable = true;
        this.reloadInit += 1;
      } catch (error) {
        console.error("Error Come In Catch clearAllData>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onClickBtn: async function (code) {
      try {
        this[code]();
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onCaptureWeight: async function () {
      try {
        let weight = await this.$axios
          .$post("/api/v3/evolve/purchaseOrderRecieve/getWeight", {
            EvolveDevice_MacID: this.device,
          })
          .catch((e) => {
            console.error("Error Come In Catch", e.message);
            console.log(e.message);
            useStore().evolveNotification({ code: 117 });
          });
        if (weight) {
          if (weight.statusCode != 200) {
            // useStore().evolveNotification( {code: weight.messageCode, vars:["Weight"]});
          }
        }
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    calculateWeight: async function (weight) {
      try {
        if (this.isAddQty) {
          this.qty += weight;
        } else {
          this.qty = weight;
        }
        await this.onChangeQty();
        console.log("the weight", weight);
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeTareWeight: async function () {
      try {
        // if(this.stockUom.toLowerCase() == 'kg'){
        // 	this
        // }
        // if (this.tareWeight>0) {
        // 	let data= {
        // 		collctionName: "EvolveUom",
        // 		selectedFild: ["_id"],
        // 		condition : {"EvolveUom_Uom" :  "KG" }
        // 	};
        // 	let uomData = await this.$axios
        // 		.$post("/api/v1/evolve/getAttributesList", data)
        // 		.catch((e) => {
        // 			console.error("Error Come In Catch", e.message);
        // 			useStore().evolveNotification( {code: 117, type: 2});
        // 		});
        // 	if (uomData) {
        // 		if (uomData.statusCode == 200) {
        // 			console.log("uomData.result;", uomData.result);
        // 			if (uomData.result.length>0) {
        // 				this.stockUom = uomData.result[0]._id;
        // 				this.stockUomSearchObj.value = this.stockUom;
        // 				// this.stockUomSearchObj.disable = true;
        // 			}
        // 			// this.gateInOutAttributesList = uomData.result;
        // 		} else {
        // 			useStore().evolveNotification( uomData.message);
        // 		}
        // 	}
        // } else {
        // 	// this.stockUom = "";
        // 	// this.stockUomSearchObj.value = "";
        // 	// this.stockUomSearchObj.disable = false;
        // }
        // this.reinitUom+=1;
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    printSingleItem: async function (index, index1) {
      try {
        if (this.printerData.EvolvePrinter_ID == undefined) {
          useStore().evolveNotification({ code: 211 });
        } else {
          let arr = [];
          let data = this.poLineArr[index];
          let datas =
            this.poLineArr[index]["EvolvePoRecieve_LineDetails"][index1];
          console.log("the datas>>>>>>>>>", datas);
          arr.push({
            EvolveItem_Code: data.EvolveItem_Code,
            EvolveItem_Desc: data.EvolveItem_Desc,
            EvolvePoRecieve_StockUom: datas.EvolvePoRecieve_StockUomCode,
            EvolvePoRecieve_StockQty: datas.EvolvePoRecieve_StockQty,
            EvolveSupplier_Code: data.EvolveSupplier_Code,
            EvolveSupplier_Name: data.EvolveSupplier_Name,
            EvolvePrintLabel_ID: this.printerLabel,
            EvolvePrinter_Code:
              this.printerData.EvolvePrinter_ID.EvolvePrinter_Code,
          });
          // console.log("the arr>>>>>>>>>", arr);
          let printerLabel = await this.$axios
            .$post("/api/v3/evolve/purchaseOrderRecieve/printLabel", {
              printerData: arr,
            })
            .catch((e) => {
              console.error("Error Come In Catch", e.message);
              useStore().evolveNotification({ code: 117 });
            });
          if (printerLabel) {
            if (printerLabel.statusCode == 200) {
              useStore().evolveNotification({ code: printerLabel.messageCode });
            } else {
              useStore().evolveNotification({ code: printerLabel.messageCode });
            }
          }
        }
      } catch (error) {
        console.error(
          "Error Come In Catch printSingleItem>>>>>>>",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChageParentCheckBox: async function (index) {
      try {
        this.poLineArr[this.currentPoLineIndex].childAttributesList[
          index
        ].EvolveAttributes_Value = "";
        for (
          let i = 0;
          i <
          this.poLineArr[this.currentPoLineIndex].childAttributesList[index]
            .SelectToArray.length;
          i++
        ) {
          if (
            this.poLineArr[this.currentPoLineIndex].childAttributesList[index]
              .SelectToArray[i].isEnable == true
          ) {
            this.poLineArr[this.currentPoLineIndex].childAttributesList[
              index
            ].EvolveAttributes_Value +=
              this.poLineArr[this.currentPoLineIndex].childAttributesList[index]
                .SelectToArray[i].value + ",";
          }
        }
        this.poLineArr[this.currentPoLineIndex].childAttributesList[
          index
        ].EvolveAttributes_Value = this.poLineArr[
          this.currentPoLineIndex
        ].childAttributesList[index].EvolveAttributes_Value.slice(0, -1);
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeDevice: async function (data) {
      try {
        if (data) {
          console.log("the device cahnbge >>>>>", data);
          this.prevDevice = this.device;

          await this.deviceSocket(data);
        }
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    convertDate: function (inputFormat) {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var d = new Date(inputFormat);
      return (
        pad(d.getDate()) +
        pad(d.getMonth() + 1) +
        d.getFullYear().toString().substr(2, 3)
      );
    },

    setLotAndRefNoValue: async function () {
      try {
        let index = this.currentPoLineIndex;
        if (this.lotSerialNo.toLowerCase() == "l") {
          this.lotNo =
            this.poLineArr[index].EvolvePO_Number.toString() +
            "-" +
            this.poLineArr[index].EvolvePODetails_Line.toString().padStart(
              3,
              "0"
            ) +
            this.convertDate(new Date());
          this.lotNoDisable = true;
        } else if (this.lotSerialNo.toLowerCase() == "p") {
          this.lotNo =
            this.poLineArr[index].EvolvePO_Number.toString() +
            "-" +
            this.poLineArr[index].EvolvePODetails_Line.toString().padStart(
              3,
              "0"
            ) +
            this.convertDate(new Date());
          this.lotNoDisable = true;
          this.refNoDisable = true;
        } else if (this.lotSerialNo.toLowerCase() == "s") {
          this.lotNo =
            this.poLineArr[index].EvolvePO_Number.toString() +
            "-" +
            this.poLineArr[index].EvolvePODetails_Line.toString().padStart(
              3,
              "0"
            ) +
            this.convertDate(new Date());
          this.lotNoDisable = true;
          this.refNoDisable = true;
          this.qty = 1;

          await this.onChangeQty();
          // this.stockQty = 1;
          this.qtyDisable = true;
        } else {
          this.lotNo =
            this.poLineArr[index].EvolvePO_Number.toString() +
            "-" +
            this.poLineArr[index].EvolvePODetails_Line.toString().padStart(
              3,
              "0"
            ) +
            this.convertDate(new Date());
          this.refNoDisable = false;
          this.lotNoDisable = false;
        }
      } catch (error) {
        console.error("Error Come In Catch>>>>>>>", error.message);
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },

    onChangeUnitCost: async function (index) {
      try {
        if (
          parseFloat(this.poLineArr[index].EvolvePODetails_EnteredUnitCost) >
            parseFloat(this.poLineArr[index].EvolvePODetails_UnitCost) &&
          !this.grnOverPrice
        ) {
          this.poLineArr[index].EvolvePODetails_EnteredUnitCost = parseFloat(
            this.poLineArr[index].EvolvePODetails_UnitCost
          );
        } else if (
          parseFloat(this.poLineArr[index].EvolvePODetails_EnteredUnitCost) < 0
        ) {
          this.poLineArr[index].EvolvePODetails_EnteredUnitCost = parseFloat(
            this.poLineArr[index].EvolvePODetails_UnitCost
          );
        }
        this.unitCostKey += 1;
      } catch (error) {
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },
    onChangePhysicalQty: async function (index) {
      if (this.poLineArr[index].pickQty) {
        if (
          parseFloat(this.poLineArr[index].physicalQty) >
          parseFloat(this.poLineArr[index].pickQty)
        ) {
          this.poLineArr[index].physicalQty = parseFloat(
            this.poLineArr[index].pickQty
          );
          this.physicalQtyKey += 1;
          this.poLineArr[index].EvolvePODetails_PhysicalQty =
            this.poLineArr[index].physicalQty;
          useStore().evolveNotification({
            code: 203,
            type: 2,
            var: ["Invoice Qty", "Qty"],
            time: 3000,
          });
        } else {
          this.poLineArr[index].EvolvePODetails_PhysicalQty = parseFloat(
            this.poLineArr[index].physicalQty
          );
          this.physicalQtyKey += 1;
        }
      }
    },

    onBlurItemUomConvRate: async function () {
      try {
        this.stockQty = parseFloat(this.qty) * parseFloat(this.itemUomConvRate);
      } catch (error) {
        console.error(
          "Error Come In Catch>>>>>>> onBlurItemUomConvRate",
          error.message
        );
        useStore().evolveNotification({
          code: 111,
          type: 2,
          var: [`${error.message}`],
        });
      }
    },
    onSelectAllSo: function (index) {
      try {
        this.poItemList.map((datas) => {
          datas.isSelected = this.isAllSelected;
        });
      } catch (error) {
        console.error(
          "Error Come In Catch onSelectAllSo>>>>>>> " +
            this.helpMasterCode +
            error.message
        );
        useStore().evolveNotification({ code: 111, type: 2, var: [] });
      }
    },
    findPoByItem: async function () {
      try {
        this.loaderShow();
        let datas = {
          gateEntryuniquepoId: this.gateEntryuniquepoId,
          EvolveItem_ID: this.itemId,
          EvolveSupplier_ID: this.supplierId,
          EvolveSupplier_Code: this.supplierCode,
          EvolveBillTo_ID: this.billTo,
          EvolveShipTo_ID: this.shipTo,
          EvolvePoRecieve_InvoiceDate: this.invoiceDate,
        };
        let list = await this.$axios
          .$post("/api/v3/evolve/purchaseOrderRecieve/findPoByItem", datas)
          .catch((e) => {
            useStore().evolveNotification({ code: 117, type: 2 });
          });
        if (list.statusCode == 200) {
          this.poItemList = list.result;
          this.isAllSelected = true;
          this.reInitIsAllCheck += 1;
          if (list.result == null) {
            this.itemId = null;
            this.itemSearchObj.value = this.itemId;
            this.reloadItem += 1;
          }
        } else {
          useStore().evolveNotification(list.message);
        }
        this.loaderHide();
      } catch (error) {
        this.loaderHide();
        console.error(
          "Error Come In Catch findPoByItem>>>>>>> " +
            this.helpMasterCode +
            error.message
        );
        useStore().evolveNotification({ code: 111, type: 2, var: [] });
      }
    },

    onSelectSinglePo: function () {
      try {
        let isAllSelected = this.poItemList.every(
          (element) => element.isSelected == true
        );
        isAllSelected
          ? (this.isAllSelected = true)
          : (this.isAllSelected = false);
        this.reInitIsAllCheck += 1;
      } catch (error) {
        console.error(
          "Error Come In Catch onSelectSinglePo>>>>>>> " +
            this.helpMasterCode +
            error.message
        );
        useStore().evolveNotification({ code: 111, type: 2, var: [] });
      }
    },
    addPoLineByItem: async function () {
      try {
        console.log("elementelementelement", this.poItemList);
        let error = false;
        let list = this.poItemList.filter((datas) => datas.isSelected == true);

        for (let i = 0; i < list.length; i++) {
          let element = list[i];
          let findIndex = this.poLineArr.findIndex(
            (datas) =>
              datas.EvolvePO_Number == element.EvolvePO_Number &&
              datas.EvolvePODetails_Line ==
                element.EvolvePODetails.EvolvePODetails_Line
          );
          if (findIndex == -1) {
            let today = new Date();
            // (YYYY-MM-DD)
            element.EvolvePODetails_NeedDate = element.EvolvePODetails_NeedDate
              ? element.EvolvePODetails_NeedDate.toLocaleString().split("T")[0]
              : "-";
            if (element.EvolvePODetails_NeedDate != "-") {
              let dueDate = new Date(element.EvolvePODetails_NeedDate);
              today.setHours(0, 0, 0, 0);
              dueDate.setHours(0, 0, 0, 0);
              if (this.isPoLineDuedate && today.getTime() > dueDate.getTime()) {
                error = true;
                useStore().evolveNotification({
                  code: 203,
                  var: [
                    "Due Date",
                    `today's date for This line ${element.EvolvePODetails_Line}`,
                  ],
                  type: 2,
                });
              }
            }
            if (!error) {
              this.polinedataObj = element;
              await this.addPoLine(false);
            }
          } else {
            useStore().evolveNotification({
              code: 165,
              type: 2,
            });
            error = true;
          }
        }

        this.poItemList = [];
        this.itemId = null;
        this.itemSearchObj.value = null;
        this.reloadItem += 1;

        UIkit.modal("#addByItem" + this.uniqId).hide();
      } catch (error) {
        console.error(
          "Error Come In Catch addPoLineByItem>>>>>>> " +
            this.helpMasterCode +
            error.message
        );
        useStore().evolveNotification({ code: 111, type: 2, var: [] });
      }
    },
    enableAddPoLineByItem: async function () {
      try {
        if (this.supplierId) {
          this.isButtonDisable = false;
        } else {
          this.isButtonDisable = true;
        }
      } catch (error) {
        console.error(
          "Error Come In Catch enabled Po line By Item>>>>>>> " +
            this.helpMasterCode +
            error.message
        );
        useStore().evolveNotification({ code: 111, type: 2, var: [] });
      }
    },
  },



};
</script>
<style lang="scss">
@import "pretty-checkbox/src/pretty-checkbox.scss";
</style>