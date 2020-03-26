class ValidUsernameValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    valid_chars = ("0".."9").to_a + ("A".."Z").to_a + ("a".."z").to_a + ["_"]

    unless value.chars.all? { |username_char| valid_chars.include?(username_char) }
      record.errors[attribute] << "must contain only underscores and alphanumeric characters."
    end

    if value.chars.first == "_"
      record.errors[attribute] << "cannot start with an underscore."
    end

    if value.chars.last == "_"
      record.errors[attribute] << "cannot end with an underscore."
    end
  end
end

class ValidEmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
      record.errors[attribute] << ": #{value} is not a valid email."
    end
  end
end

class SecurePasswordValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)

    unless ("0".."9").to_a.any? { |num| value.include?(num) }
      record.errors[attribute] << "must contain at least 1 number."
    end

    unless ("A".."Z").to_a.any? { |char| value.include?(char) }
      record.errors[attribute] << "must contain at least 1 capital letter."
    end

    special_chars = ['@', '%', '+', '!', '#', '$', '^', '?', ':', '(', ')', '[', ']', '~', '-', '.', '_']
    unless special_chars.any? { |special_char| value.include?(special_char) }
      record.errors[attribute] << "must contain at least one of the following special characters: @ % + . ! # $ ^ ? : ( ) [ ] ~ - _."
    end
  end
end