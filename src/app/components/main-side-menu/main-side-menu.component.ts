import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MenuGroupItem } from 'src/app/core/models/side-menu.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  selector: 'app-main-side-menu',
  templateUrl: './main-side-menu.component.html',
})
export class MainSideMenuComponent implements OnDestroy {
  adminMenu: MenuGroupItem[] = [
    {
      title: 'الموردين',
      icon: 'assets/images/earth.svg',
      link: 'suppliers-manager',
      subLink: 'suppliers',
      subMenu: [
        {
          title: 'الموردين',
          link: 'suppliers',
        },
        {
          title: 'المنتجات',
          link: 'products',
        },
        {
          title: 'توريد مخزني',
          link: 'stock-purchases',
        },
        {
          title: 'ربط المنتجات',
          link: 'link-products',
        },
        {
          title: 'المحفظة',
          link: 'wallet',
        },
      ],
    },
    {
      title: 'البائعين',
      icon: 'assets/images/seller.svg',
      link: 'sellers-manager',
      subLink: 'sellers',
      subMenu: [
        {
          title: 'البائعين',
          link: 'sellers',
        },
        {
          title: 'سجل الطلبات',
          link: 'orders',
        },
        {
          title: 'العملاء',
          link: 'customers',
        },
      ],
    },
    {
      title: 'التهيئة',
      icon: 'assets/images/setup.svg',
      link: 'setup-manager',
      subLink: 'banks',
      subMenu: [
        {
          title: 'البنوك',
          link: 'banks',
        },
        {
          title: 'العملات',
          link: 'currencies',
        },
        {
          title: 'مناطق البنوك',
          link: 'banks-locations',
        },
        {
          title: 'الفئات',
          link: 'categories',
        },
        {
          title: 'المخازن',
          link: 'inventories',
        },
      ],
    },
  ];

  sellerMenu: MenuGroupItem[] = [
    {
      title: 'كاتلوج المنتجات',
      icon: 'assets/images/catalog.svg',
      link: 'catalog-manager',
      subLink: '',
      subMenu: [],
    },
  ];

  menu: MenuGroupItem[] = [];

  destroy$: Subject<void> = new Subject();

  currentModuleURL: string = '';
  currentGroupURL: string = '';

  constructor(private router: Router, private utilService: UtilService, private authService: AuthService) { }

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        if (event.routerEvent instanceof NavigationEnd) {
          const urls = event.routerEvent.url
            .split('/')
            .filter((el: string) => el !== '');
          this.currentGroupURL = urls[1];
          this.currentModuleURL = urls[2];
        }
      });

    this.authService.getUser()?.roles.forEach((el) => {
      if (el.name === 'admin') {
        this.menu = [...this.menu, ...this.adminMenu];
      } else if (el.name === 'seller') {
        this.menu = [...this.menu, ...this.sellerMenu];
      }
    })
  }

  getSubItems() {
    return (
      this.adminMenu.find((el) => el.link === this.currentGroupURL)?.subMenu ?? []
    );
  }

  canShowSubItems() {
    const res = this.getSubItems().length != 0;
    return res;
  }

  goToLink(link: string[]) {
    link = link.filter((el) => !!el);

    this.utilService.gotoLink(['home', ...link]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
