import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LayoutOne } from 'src/app/core/models/layout-one.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ResponseList } from 'src/app/core/models/response-list.model';
import { SupplierGetPaged } from 'src/app/core/models/supplier.model';
import { APIService } from 'src/app/core/services/api.service';
import { SignalService } from 'src/app/core/services/signal.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
})
export class SuppliersListComponent implements OnInit {
  unsubscribe$ = new Subject();

  meta: LayoutOne = {
    title: 'الموردين',
    mainAction: {
      id: 'add-supplier',
      type: 'goto',
      link: ['home', 'suppliers-manager', 'suppliers', 'supplier-form'],
      label: 'إضافة مورد +',
      textColor: 'text-white',
      bgColor: 'bg-red-600',
    },
    filter: {
      fields: [
        {
          id: 'company',
          text: 'النشاط التجاري',
        },
        {
          id: 'company_address',
          text: 'العنوان',
        },
      ],
      conditions: [
        {
          id: 'equals',
          text: 'يساوي',
        },
        {
          id: 'not',
          text: 'لا يساوي',
        },
      ],
    },
    table: {
      columns: [
        {
          key: 'id',
          label: 'ID',
          isSortable: true,
        },
        {
          key: 'name',
          label: 'اسم المورد',
          isSortable: true,
        },
        {
          key: 'phone',
          label: 'الهاتف',
          isSortable: true,
        },
        {
          key: 'company',
          label: 'اسم النشاط',
          isSortable: true,
        },
        {
          key: 'company_address',
          label: 'العنوان',
          isSortable: true,
        },
        {
          label: 'اجراء',
          isSortable: false,
          class: 'justify-center',
        },
      ],
      meta: {
        isSelectable: true,
      },
      row: [
        {
          class: 'flex justify-start',
          items: [
            {
              key: 'id',
              type: 'text',
            },
          ],
        },
        {
          class: 'flex justify-start',
          items: [
            {
              key: 'name',
              type: 'text',
            },
          ],
        },
        {
          class: 'flex justify-start',
          items: [
            {
              type: 'text',
              resolve: (item: SupplierGetPaged) => item.phone ?? ''
            },
          ],
        },
        {
          class: 'flex justify-start',
          items: [
            {
              key: 'company',
              type: 'text',
            },
          ],
        },
        {
          class: 'flex justify-start',
          items: [
            {
              key: 'company_address',
              type: 'text',
            },
          ],
        },
        {
          class: 'flex justify-center',
          items: [
            {
              key: '',
              type: 'icon-action',
              action: {
                id: 'edit-supplier',
                icon: 'edit',
                link: ['suppliers-manager', 'suppliers', 'supplier-form'],
                type: 'edit-form',
              },
            },
            {
              key: '',
              type: 'icon-action',
              action: {
                id: 'view-supplier',
                icon: 'eye',
              },
            },
            {
              key: '',
              type: 'icon-action',
              action: {
                id: 'view-supplier',
                icon: 'delete',
                type: 'delete',
                signals: ['suppliers-list'],
                url: 'suppliers',
              },
            },
          ],
        },
      ],
    },
  };

  listData: ResponseList<SupplierGetPaged> = {
    items: [],
    pagination: {
      totalItems: 10,
      currentPage: 0,
      pageSize: 10,
    },
  };

  isLoading = true;

  query: RequestQuery = {
    pagination: {
      pageSize: 10,
      currentPage: 0,
    },
    sorts: [
      {
        key: 'updatedAt',
        value: 'desc',
      },
    ],
  };

  ngOnInit(): void {
    this.fetchData(this.query);
    this.signalService.signal$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (signal) => {
        if (!signal) return;
        if (signal === 'suppliers-list') this.fetchData(this.query);
      },
    });
  }

  fetchData(query: RequestQuery): void {
    this.isLoading = true;
    this.apiService
      .getPaged<SupplierGetPaged>(query, 'suppliers/getPaged')
      .subscribe({
        next: (data) => {
          this.listData = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      });
  }

  constructor(
    private apiService: APIService,
    private utilService: UtilService,
    private signalService: SignalService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
  }
}
