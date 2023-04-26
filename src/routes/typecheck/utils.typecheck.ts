export function validationString (item: any): boolean {
  if (typeof item !== 'string') {
    return false
  } else {
    return true
  }
}

export function validationNumber (item: any): boolean {
  if (typeof item !== 'number') {
    return false
  } else {
    return true
  }
}

export function validationArray (item: any): boolean {
  if (!Array.isArray(item)) {
    return false
  } else {
    return true
  }
}

export function validationBoolean (item: any): boolean {
  if (typeof item !== 'boolean') {
    return false
  } else {
    return true
  }
}

export function validationArrayString (item: any): boolean {
  if (validationArray(item)) {
    const notString = item.filter((e: any) => typeof e !== 'string')
    if (notString.length > 0) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
