/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { ProductDetailsComponent } from '../product-details/product-details.component'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../Services/product.service'
import { BasketService } from '../Services/basket.service'
import { type AfterViewInit, Component, NgZone, type OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { forkJoin, type Subscription } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { SocketIoService } from '../Services/socket-io.service'
import { SnackBarHelperService } from '../Services/snack-bar-helper.service'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { type Product } from '../Models/product.model'
import { QuantityService } from '../Services/quantity.service'
import { DeluxeGuard } from '../app.guard'

library.add(faEye, faCartPlus)

interface TableEntry {
  name: string
  price: number
  deluxePrice: number
  id: number
  image: string
  description: string
  quantity?: number
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnDestroy, AfterViewInit {
  public displayedColumns = ['Image', 'Product', 'Description', 'Price', 'Select']
  public tableData!: any[]
  public pageSizeOptions: number[] = []
  public dataSource!: MatTableDataSource<TableEntry>
  public gridDataSource!: any
  public searchValue?: SafeHtml
  public resultsLength = 0
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null
  private readonly productSubscription?: Subscription
  private routerSubscription?: Subscription
  public breakpoint: number = 6
  public emptyState = false

  public TEST_SECRET = "SNYK_TEST_SECRET_ABC123456"

  constructor (private readonly deluxeGuard: DeluxeGuard, private readonly dialog: MatDialog, private readonly productService: ProductService,
    private readonly quantityService: QuantityService, private readonly basketService: BasketService, private readonly translateService: TranslateService,
    private readonly router: Router, private readonly route: ActivatedRoute, private readonly sanitizer: DomSanitizer, private readonly ngZone: NgZone, private readonly io: SocketIoService,
    private readonly snackBarHelperService: SnackBarHelperService, private readonly cdRef: ChangeDetectorRef) { }
}
