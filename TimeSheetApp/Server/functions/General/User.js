const query = require("../../sql-query/SQLQuery");

async function login(email, password) {
  try {
    var records = await query(
      "select member_id,first_name,last_name,email,permission,avatar from members where LOWER(email)='" +
        email.toLowerCase() +
        "' and password='" +
        password +
        "'"
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function register(
  street_code,
  street_name,
  area,
  city,
  country,
  first_name,
  last_name,
  email,
  password
) {
  try {
    var users = await query("select * from members where email = '" + email+"'");
    if (!users.length) {
      var andress = await query(
        "insert into address values (" +
          parseInt(street_code) +
          ",'" +
          street_name +
          "','" +
          area +
          "','" +
          city +
          "','" +
          country +
          "');select @@IDENTITY AS 'identity'"
      );
      await query(
        "insert into members values('" +
          password +
          "','" +
          email +
          "','" +
          first_name +
          "','" +
          last_name +
          "'," +
          andress[0].identity +
          ",NULL,NULL,getdate(),'ProductOwner',NULL,NULL,NULL,getdate())"
      );
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadMemberByOrganizationEmail(member_id) {
  try {
    var records = await query(
      "select m.member_id,m.email,m.avatar,CONCAT(first_name, ' ', last_name) AS member_name from members m where email like '%' + (select RIGHT(email, LEN(email) - CHARINDEX('@', email)) from members m2 where m2.member_id= " +
        member_id +
        ") and m.member_id != " +
        member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function saveProfile(
  member_id,
  street_code,
  street_name,
  area,
  city,
  country,
  password,
  first_name,
  last_name,
  phone,
  gender,
  avatar
) {
  try {
    var memberInfo = await query(
      "select address_id from members where member_id = " + member_id
    );
    if (memberInfo[0].address_id) {
      await query(
        "update members set password='" +
          password +
          "',first_name='" +
          first_name +
          "',last_name='" +
          last_name +
          "',phone='" +
          phone +
          "',gender=" +
          (gender == "true" ? 1 : 0) +
          ",avatar='" +
          avatar +
          "' where member_id=" +
          member_id
      );

      await query(
        "update address set street_code=" +
          street_code +
          ",street_name='" +
          street_name +
          "',area='" +
          area +
          "',city='" +
          city +
          "',country= '" +
          country +
          "' where address_id =" +
          member_id
      );
    } else {
      var identity = await query(
        "insert into address values (" +
          street_code +
          ",'" +
          street_name +
          "','" +
          area +
          "','" +
          city +
          "','" +
          country +
          "');select @@IDENTITY AS 'identity'"
      );
      await query(
        "update members set password='" +
          password +
          "',first_name='" +
          first_name +
          "',last_name='" +
          last_name +
          "',address_id=" +
          identity[0].identity +
          ",phone='" +
          phone +
          "',gender=" +
          (gender == "true" ? 1 : 0) +
          ",avatar='" +
          avatar +
          "' where member_id=" +
          member_id
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function saveAvatar(member_id, avatar) {
  try {
    await query(
      "update members set avatar ='" + avatar + "' where member_id=" + member_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadProfile(member_id) {
  try {
    var profile = await query(
      "select m.member_id,email,password,first_name,last_name,address_id,phone,gender,avatar from members m where m.member_id = " +
        member_id
    );

    var department = await query(
      "select department_name from members m inner join department d on d.department_id = m.department_id where m.member_id = " +
        member_id
    );

    var position = await query(
      "select position_name from members m inner join position d on d.position_id = m.position_id where m.member_id = " +
        member_id
    );

    var address = await query(
      "select street_code,street_name,area,city,country from address where address_id = " +
        profile[0].address_id
    );

    profile[0] = {
      ...profile[0],
      ...address[0],
      ...department[0],
      ...position[0],
    };

    return profile[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  login,
  register,
  loadMemberByOrganizationEmail,
  loadProfile,
  saveProfile,
  saveAvatar,
};
