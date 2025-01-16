import { inject, Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class PathParamService {
  private _route = inject(ActivatedRoute)

  /**
   * Gets a URL path parameter value by its key.
   */
  getPathParam(key: string): string {
    return this._route.snapshot.paramMap.get(key) ?? ''
  }
}
