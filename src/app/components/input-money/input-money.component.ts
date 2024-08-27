import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyModel } from 'src/app/core/models/currency.model';
import { RequestQuery } from 'src/app/core/models/query.model';
import { ActionHandlerService } from 'src/app/core/services/action-handler.service';
import { APIService } from 'src/app/core/services/api.service';
import { SignalService } from 'src/app/core/services/signal.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-input-money',
  templateUrl: './input-money.component.html',
})
export class InputMoneyComponent implements OnInit {
  @Input({ required: true }) numberControl!: FormControl;
  @Input({ required: true }) currencyControl!: FormControl;

  unsubscribe$ = new Subject();

  isLoading = true;

  currencies: CurrencyModel[] = [];
  currentCurrency?: CurrencyModel;

  canShow = false;

  ngOnInit(): void {
    this.fetchData();
    this.signalService.signal$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (signal) => {
        if (!signal) return;
        if (signal === 'currencies-list') this.fetchData();
      },
    });
  }

  fetchData(): void {
    this.isLoading = true;
    this.apiService.getAll<CurrencyModel>('banks-currencies').subscribe({
      next: (data) => {
        this.currencies = data;
        if (!this.currencyControl.value && data[0]) {
          this.currentCurrency = data[0];
          this.currencyControl.setValue(this.currentCurrency.id);
        } else if (this.currencyControl.value && data.length > 0) {
          this.currentCurrency = this.currencies.find(
            (el) => el.id === this.currencyControl.value
          );
        }

        this.currencyControl.updateValueAndValidity();
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
    private signalService: SignalService,
    private actionHandler: ActionHandlerService
  ) {}
}
