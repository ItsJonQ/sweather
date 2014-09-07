# global beforeEach, describe, it, assert, expect
"use strict"

describe 'Location Model', ->
  beforeEach ->
    @LocationModel = new Sweather.Models.Location();
