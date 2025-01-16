import { inject, Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class QueryParamService {
  private _route = inject(ActivatedRoute)

  /**
   * Gets a query parameter value from the current URL by its key.
   */
  getQueryParam(key: string): string {
    return this._route.snapshot.queryParamMap.get(key) ?? ''
  }
}
